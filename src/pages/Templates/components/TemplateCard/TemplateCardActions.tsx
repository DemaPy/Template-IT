import { TemplateCardActionsProps } from "./types";
import { ArrowUpIcon, Share, Trash } from "lucide-react";
import Dialog from "@/components/Dialog/Dialog";
import Tooltip from "@/components/Tooltip/Tooltip";
import { useDeleteTemplate } from "../../pages/hooks/useTemplate";
import { Link } from "react-router-dom";

const TemplateCardActions = ({ id, title }: TemplateCardActionsProps) => {
  const { isPending: isDeleting, mutate } = useDeleteTemplate();

  const onShare = () => { };

  const onDelete = () => {
    mutate({ id });
  };

  return (
    <div className="flex items-center gap-4">
      <Tooltip description="Open template">
        <Link to={`/templates/${id}`}>
          <ArrowUpIcon className="w-4 h-4" />
        </Link>
      </Tooltip>
      <Dialog
        title={`Share template ${title}`}
        description="Collaborate faster with teammates."
        onCancel={() => console.info("Cancel")}
        onSubmit={onShare}
      >
        <Tooltip description="Share template">
          <Share className="w-4 h-4" />
        </Tooltip>
      </Dialog>
      <Dialog
        title={`Delete template ${title}`}
        description="We'll delete from any shared template links, too. People who already added from a share link will not be affected."
        onCancel={() => console.info("Cancel")}
        onSubmit={onDelete}
        isLoading={isDeleting}
      >
        <Tooltip description="Delete template">
          <Trash className="w-4 h-4" />
        </Tooltip>
      </Dialog>
    </div>
  );
};

export default TemplateCardActions;
