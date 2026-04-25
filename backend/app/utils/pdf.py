from pypdf import PdfReader

def parse_pdf(content):
    reader = PdfReader(content)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text