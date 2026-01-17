import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    const isMobile = useIsMobile();
    
    // On mobile, if we have more than 2 items, we show ellipsis and only last two
    const visibleBreadcrumbs = isMobile && breadcrumbs.length > 2 
        ? [breadcrumbs[0], { title: '...', href: '#' }, ...breadcrumbs.slice(-1)] 
        : breadcrumbs;

    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {visibleBreadcrumbs.map((item, index) => {
                            const isLast = index === visibleBreadcrumbs.length - 1;
                            const isEllipsis = item.title === '...';

                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="max-w-[150px] truncate md:max-w-none">
                                                {item.title}
                                            </BreadcrumbPage>
                                        ) : isEllipsis ? (
                                            <BreadcrumbEllipsis />
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href}>
                                                    {item.title}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}
