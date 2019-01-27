# Testing Workbench:

This is where scripts and other files can be tested

## PDF Parsing (pdfMiner/Slate):

Install instructions (if you want to mess around with PDF parsing):
  * Python 2.7 and up ONLY (different setup for Python3)
  1. pip install pdfminer==20110515
  2. pip install slate
  3. Example code to parse some PDF:
  * ```python
    import slate
    with open('grd20181EN.pdf') as f:
        doc = slate.PDF(f)
        print(doc)
    ```

## PDF Parsing (PyPDF2)
  1. pip install PyPDF2
  2. Example code:
  * ```python
    from PyPDF2 import PdfFileReader

    def parsePDF(path):
        with open(path, 'rb') as f:
            pdf = PdfFileReader(f)
            page = pdf.getPage(0)
            print(page)
            print('Page type : {}'.format(str(type(page))))

            text = page.extractText()
            print(text)

    if __name__ == '__main__':
        path = 'grd20181EN.pdf'
        parsePDF(path)
    ```
### Regex Expression Testing:
   *    ```python
        regexCourse = "/([A-Z]{4}-[0-9]{3}-[0-9]{3})+/" 
        regexGrades = "/(?<![-\.]|[0-9])([0-9]{1,3}(?![-\d]))/"
        regexGPA = "/[0-9]{1}\.[0-9]{3}/"
        regexProfessors = "/(?!\\n)[A-Z\s]+(?=\\n)/"
        regexCleanTotalCourse = "/(COURSE TOTAL:[\s\S]*?(?=[A-Z]))|(DEPARTMENT TOTAL:[\s\S]*(?![A-Z]))/"
        regexCleanPercentages = "/([0-9]+\.[0-9]+[%]\\n)/"
        regexCleanHeaders = "/^[\s\S]*?(?=[A-Z]{4}-[0-9]{3}-[0-9]{3})/"
        ```