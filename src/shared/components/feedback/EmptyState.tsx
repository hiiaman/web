interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: string;
}

export default function EmptyState({ title, description, action, icon = "📭" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="text-5xl">{icon}</span>
      <div>
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
