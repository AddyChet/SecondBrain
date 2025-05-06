import { Youtube, Twitter, BookText, Link2 } from 'lucide-react'; // Ensure 'Youtube' is used in the code below

export const getStartIcon = (type: string): React.ReactElement | null => {
    if (type === "youtube") {
      return <Youtube />; // 'Youtube' is now used here
    } else if (type === "twitter") {
      return <Twitter />;
    } else if (type === "documents") {
      return <BookText />;
    } else if (type === "links") {
      return <Link2 />;
    } else {
      return null;
    }
  };
  