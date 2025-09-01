/**
 * Proprietà comuni a tutti i template di siti web di "you're invited"
 */
export interface IWebsiteTemplate {
  name1?: string;
  name2?: string;
  coverImageUrl?: string;
  eventDate?: string;
  subtitle?: string;
  mainParagraph?: string;
  extraContent1ImageUrl?: string;

  location?: string;
  date?: string;

  visibility?: {
    mainContent?: boolean;
  };
}
