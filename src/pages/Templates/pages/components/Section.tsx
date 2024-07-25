import Heading from "@/components/Heading";
import { Textarea } from "@/components/ui/textarea";
import { usePlaceholderCreateModal } from "@/store/placeholderCreateModal";
import { useSectionCreateModal } from "@/store/sectionCreateModal";
import { useSectionUpdateModal } from "@/store/sectionUpdateModal";
import { handleResponse } from "@/utils/handleResponse";
import {
  ChevronDown,
  ChevronUpIcon,
  CopyIcon,
  Edit2Icon,
  TrashIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Placeholders from "./Placeholders";
import { SectionService } from "@/services/DI/Section";

type Props = {
  item: Section;
  template_id: string;
};

const Section = ({ item }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Problem???
  const setSectionCreate = useSectionCreateModal((state) => state.setSection);

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpenTextArea] = useState(false);
  const setIsOpen = useSectionUpdateModal((state) => state.setOpen);
  const setSection = useSectionUpdateModal((state) => state.setSection);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const setIsPlaceholderOpen = usePlaceholderCreateModal(
    (state) => state.setOpen
  );
  const setPlaceholder = usePlaceholderCreateModal(
    (state) => state.setPlaceholder
  );

  const handleClick = () => {
    setIsOpen();
    setSection(item);
  };

  useEffect(() => {
    if (!ref.current) return;

    const handleClick = (ev: MouseEvent) => {
      if (ev.ctrlKey && ev.target) {
        setSection(item);
        setPlaceholder((ev.target as HTMLTextAreaElement).selectionStart);
        setIsPlaceholderOpen();
      }
    };

    ref.current.addEventListener("click", handleClick);
    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  const handleDeleteSection = async () => {
    setLoading(true);
    const response = await SectionService.delete({ id: item.id });
    const parsed = handleResponse<Section>(response, location, navigate);
    setLoading(false);
    if (parsed) {
      setSectionCreate(parsed.data);
    }
    setLoading(false);
  };

  const handleDeletePlaceholder = async (placeholder_id: Placeholder["id"]) => {
    setLoading(true);
    const response = await SectionService.deletePlaceholder(placeholder_id);
    const parsed = handleResponse<Placeholder>(response, location, navigate);
    if (parsed) {
      setSectionCreate({
        ...item,
        placeholders: [...item.placeholders, parsed.data],
      });
    }
    setLoading(false);
  };

  const handleDuplicate = async () => {
    setLoading(true);
    const response = await SectionService.duplicate({ id: item.id });
    const parsed = handleResponse<Section>(response, location, navigate);
    if (parsed) {
      setSectionCreate(parsed.data);
    }
    setLoading(false);
  };

  const actions = [
    {
      icon: isOpen ? (
        <ChevronUpIcon className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      ),
      onClick: () => setIsOpenTextArea(!isOpen),
    },
    {
      icon: <TrashIcon className="w-4 h-4 text-red-400" />,
      onClick: handleDeleteSection,
    },
    {
      icon: <CopyIcon className="w-4 h-4 text-blue-400" />,
      onClick: handleDuplicate,
      isLoading: loading,
    },
  ];

  const addPlaceholdersToContent = () => {
    return item.content;
  };

  return (
    <li className="w-full flex flex-col gap-4 border rounded-md p-4">
      <Heading
        title={item.title}
        actions={actions}
        size="xs"
        action={{
          isLoading: loading,
          icon: <Edit2Icon className="w-4 h-4 text-yellow-400" />,
          onClick: handleClick,
        }}
      />
      {isOpen && (
        <>
          <Textarea
            ref={ref}
            defaultValue={addPlaceholdersToContent()}
            className="resize-none w-full min-h-60 max-h-72"
          />
          <Placeholders
            handleDeletePlaceholder={handleDeletePlaceholder}
            placeholders={item.placeholders}
          />
        </>
      )}
    </li>
  );
};

export default Section;
