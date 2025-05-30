import { cn } from '../../lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

// Card skeleton component
function CardSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border rounded-lg p-6 space-y-4', className)}
      {...props}
    >
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>
    </div>
  );
}

// Table skeleton component
function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
  ...props
}: {
  rows?: number;
  columns?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {/* Table header */}
      <div className='flex space-x-4 pb-2 border-b'>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className='h-4 flex-1' />
        ))}
      </div>
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className='flex space-x-4 py-2'>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className='h-4 flex-1' />
          ))}
        </div>
      ))}
    </div>
  );
}

// Stats card skeleton
function StatCardSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('border rounded-lg p-6', className)} {...props}>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-8 w-[60px]' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>
    </div>
  );
}

// Form skeleton component
function FormSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='h-10 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[120px]' />
        <Skeleton className='h-10 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[80px]' />
        <Skeleton className='h-20 w-full' />
      </div>
      <div className='flex gap-2 pt-4'>
        <Skeleton className='h-10 w-[100px]' />
        <Skeleton className='h-10 w-[100px]' />
      </div>
    </div>
  );
}

// Avatar skeleton
function AvatarSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton className={cn('h-10 w-10 rounded-full', className)} {...props} />
  );
}

// List item skeleton
function ListItemSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center space-x-4 p-4 border rounded',
        className
      )}
      {...props}
    >
      <AvatarSkeleton />
      <div className='space-y-2 flex-1'>
        <Skeleton className='h-4 w-[200px]' />
        <Skeleton className='h-3 w-[150px]' />
      </div>
      <Skeleton className='h-8 w-[80px]' />
    </div>
  );
}

// Page header skeleton
function PageHeaderSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-4 mb-6', className)} {...props}>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-[300px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  );
}

export {
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  StatCardSkeleton,
  FormSkeleton,
  AvatarSkeleton,
  ListItemSkeleton,
  PageHeaderSkeleton,
};
