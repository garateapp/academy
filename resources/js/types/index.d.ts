import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

// Learning Module Types
export interface Course {
    id: number;
    title: string;
    description: string | null;
    version: string;
    status: 'draft' | 'active' | 'obsolete';
    allow_self_enrollment?: boolean;
    expires_at: string | null;
    created_by: number | null;
    created_at: string;
    updated_at: string;
    creator?: User;
    modules?: CourseModule[];
}

export interface CourseModule {
    id: number;
    course_id: number;
    type: 'text' | 'video' | 'file' | 'link' | 'assessment' | 'scorm' | 'interactive_document';
    title: string;
    content: string | null;
    asset_path: string | null;
    sort_order: number;
    config_json?: { [key: string]: unknown } | null;
    assessment_id?: number | null;
    assessment?: {
        id: number;
        max_attempts: number | null;
    } | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
