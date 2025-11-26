import { memo } from "react";

type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
};

function ContactInfoItem({ icon, title, content }: ContactItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-1 transition-colors duration-300">
          {title}
        </h3>
        {typeof content === "string" ? (
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {content}
          </p>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default memo(ContactInfoItem);
