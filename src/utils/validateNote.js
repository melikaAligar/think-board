function validateNote(title, content) {
  const cleanTitle = title.trim();
  const cleanContent = content.trim();

  if (!cleanTitle) {
    return "لطفاً عنوان یادداشت را وارد کنید";
  }

  if (cleanTitle.length < 3) {
    return "عنوان یادداشت باید حداقل ۳ کاراکتر باشد";
  }

  if (cleanTitle.length > 100) {
    return "عنوان یادداشت نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد";
  }

  if (!cleanContent) {
    return "لطفاً توضیحات یادداشت را وارد کنید";
  }

  if (cleanContent.length < 10) {
    return "توضیحات یادداشت باید حداقل ۱۰ کاراکتر باشد";
  }

  if (cleanContent.length > 100) {
    return "توضیحات نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد";
  }

  return null;
}

export default validateNote;