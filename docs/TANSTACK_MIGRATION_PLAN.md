# TanStack Migration Plan

## Executive Summary

This document outlines a phased migration plan to integrate TanStack libraries into the personal-website project. The codebase is a Next.js 15 + React 19 portfolio site currently using static data. TanStack integration will enable dynamic data fetching, improved state management, and enhanced data display capabilities.

---

## Current State Analysis

| Aspect | Current Implementation | TanStack Opportunity |
|--------|------------------------|---------------------|
| **Data Fetching** | None (static arrays) | TanStack Query |
| **Tables** | None (grid layouts) | TanStack Table |
| **Routing** | Next.js App Router | Keep existing (compatible) |
| **Forms** | None | TanStack Form (future) |
| **State Management** | React useState + next-themes | TanStack Query + optional Store |

### Tech Stack Compatibility
- ✅ Next.js 15.5.9 - Fully compatible
- ✅ React 19.0.0 - Fully compatible
- ✅ TypeScript 5+ - Full type support
- ✅ App Router - Works with all TanStack libraries

---

## Phase 1: TanStack Query Setup (Foundation)

**Goal**: Establish data fetching infrastructure for future dynamic content.

### Step 1.1: Install Dependencies

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

### Step 1.2: Create Query Provider

Create `/src/app/providers/QueryProvider.tsx`:

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Step 1.3: Update Root Layout

Modify `/src/app/layout.tsx` to wrap with QueryProvider:

```tsx
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './components/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

### Step 1.4: Create Type Definitions

Create `/src/types/index.ts`:

```tsx
export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  tags: Tag[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Tag {
  name: string;
  color: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
```

---

## Phase 2: API Routes & Data Migration

**Goal**: Move static data to API endpoints and fetch with TanStack Query.

### Step 2.1: Create API Routes

Create `/src/app/api/projects/route.ts`:

```tsx
import { NextResponse } from 'next/server';
import { projects } from '@/data/projects';

export async function GET() {
  // Simulate network delay for realistic UX
  // Remove in production or connect to real database
  return NextResponse.json(projects);
}
```

Create `/src/app/api/skills/route.ts`:

```tsx
import { NextResponse } from 'next/server';
import { skills } from '@/data/skills';

export async function GET() {
  return NextResponse.json(skills);
}
```

### Step 2.2: Create Data Files

Create `/src/data/projects.ts`:

```tsx
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    description: "Description here",
    icon: "🚀",
    iconBg: "bg-blue-500/20",
    tags: [{ name: "React", color: "text-blue-400" }],
    featured: true,
  },
  // ... migrate existing projects from Projects.tsx
];
```

### Step 2.3: Create Custom Query Hooks

Create `/src/hooks/useProjects.ts`:

```tsx
import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/types';

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: fetchProjects,
    select: (data) => data.filter((project) => project.featured),
  });
}
```

### Step 2.4: Update Projects Component

Modify `/src/app/components/Projects.tsx`:

```tsx
'use client';

import { useProjects } from '@/hooks/useProjects';

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (error) {
    return <ProjectsError error={error} />;
  }

  return (
    <section id="projects">
      {/* Existing JSX with projects from query */}
    </section>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      ))}
    </div>
  );
}
```

---

## Phase 3: TanStack Table Integration

**Goal**: Add sortable, filterable project display with TanStack Table.

### Step 3.1: Install TanStack Table

```bash
pnpm add @tanstack/react-table
```

### Step 3.2: Create Projects Table Component

Create `/src/app/components/ProjectsTable.tsx`:

```tsx
'use client';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/types';

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'title',
    header: 'Project',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.original.icon}</span>
        <span>{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'tags',
    header: 'Technologies',
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.tags.map((tag) => (
          <span key={tag.name} className={`text-xs ${tag.color}`}>
            {tag.name}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ getValue }) => (getValue() ? '⭐' : '—'),
  },
];

export function ProjectsTable() {
  const { data: projects = [] } = useProjects();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search projects..."
        className="mb-4 p-2 border rounded"
      />
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer p-2 text-left"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] ?? ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Phase 4: Advanced Features (Optional)

### Step 4.1: Server-Side Prefetching (SSR)

For improved performance, prefetch data on the server:

```tsx
// src/app/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { projects } from '@/data/projects';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: () => projects, // or fetch from DB
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Projects />
    </HydrationBoundary>
  );
}
```

### Step 4.2: Optimistic Updates

For future admin/editing features:

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: Project) => {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
      });
      return response.json();
    },
    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData(['projects']);

      queryClient.setQueryData(['projects'], (old: Project[]) =>
        old.map((p) => (p.id === newProject.id ? newProject : p))
      );

      return { previousProjects };
    },
    onError: (err, newProject, context) => {
      queryClient.setQueryData(['projects'], context?.previousProjects);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
```

### Step 4.3: TanStack Form (For Contact Form)

```bash
pnpm add @tanstack/react-form @tanstack/zod-form-adapter zod
```

```tsx
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export function ContactForm() {
  const form = useForm({
    defaultValues: { name: '', email: '', message: '' },
    validatorAdapter: zodValidator(),
    validators: { onChange: contactSchema },
    onSubmit: async ({ value }) => {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(value),
      });
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      {/* Form fields with form.Field */}
    </form>
  );
}
```

---

## Implementation Checklist

### Phase 1: Query Setup ⬜
- [ ] Install @tanstack/react-query and devtools
- [ ] Create QueryProvider component
- [ ] Update root layout with provider
- [ ] Create type definitions
- [ ] Verify devtools are working

### Phase 2: Data Migration ⬜
- [ ] Create /src/data/ directory with static data files
- [ ] Create API routes for projects and skills
- [ ] Create custom query hooks (useProjects, useSkills)
- [ ] Update Projects component to use query
- [ ] Update About component to use query
- [ ] Add loading skeletons
- [ ] Add error handling

### Phase 3: TanStack Table ⬜
- [ ] Install @tanstack/react-table
- [ ] Create ProjectsTable component
- [ ] Add sorting functionality
- [ ] Add filtering functionality
- [ ] Style table with Tailwind + Catppuccin theme

### Phase 4: Advanced Features ⬜
- [ ] Implement SSR prefetching
- [ ] Add optimistic updates (if needed)
- [ ] Create contact form with TanStack Form
- [ ] Add form validation with Zod

---

## File Structure After Migration

```
src/
├── app/
│   ├── api/
│   │   ├── projects/
│   │   │   └── route.ts
│   │   ├── skills/
│   │   │   └── route.ts
│   │   └── contact/
│   │       └── route.ts
│   ├── providers/
│   │   └── QueryProvider.tsx
│   ├── components/
│   │   ├── Projects.tsx (updated)
│   │   ├── ProjectsTable.tsx (new)
│   │   ├── About.tsx (updated)
│   │   ├── Contact.tsx (updated with form)
│   │   └── ... (existing)
│   ├── layout.tsx (updated)
│   └── page.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── social.ts
├── hooks/
│   ├── useProjects.ts
│   ├── useSkills.ts
│   └── useContact.ts
├── types/
│   └── index.ts
└── lib/
    └── queryClient.ts (optional shared config)
```

---

## Dependencies Summary

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.x",
    "@tanstack/react-table": "^8.x",
    "@tanstack/react-form": "^0.x",
    "@tanstack/zod-form-adapter": "^0.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "@tanstack/react-query-devtools": "^5.x"
  }
}
```

---

## Benefits After Migration

1. **Automatic Caching**: Data is cached and reused across components
2. **Background Refetching**: Data stays fresh without manual intervention
3. **Loading/Error States**: Built-in state management for async operations
4. **DevTools**: Visual debugging of query states
5. **TypeScript Integration**: Full type safety with query results
6. **Optimistic Updates**: Instant UI feedback for mutations
7. **SSR Support**: Prefetch data on server for faster initial load
8. **Table Features**: Sorting, filtering, pagination out of the box

---

## Notes

- This migration is incremental - each phase can be deployed independently
- Phase 1 is foundational and should be completed first
- Phases 2-4 can be prioritized based on feature needs
- The existing static site will continue to work during migration
- Consider adding a database (Prisma + PostgreSQL/SQLite) for persistent data
