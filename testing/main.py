import re
from PyPDF2 import PdfFileReader

def parsePDF(path):
    with open(path, 'rb') as f:
        pdf = PdfFileReader(f)
        page = pdf.getPage(0)
        print('Page type : {}'.format(str(type(page))))

        text = page.extractText().encode('ascii', 'ignore')
        extractCourses(text)
        extractGrades(text)
        print(text)

def extractCourses(text):
    regex = "([A-Z]{4}-[0-9]{3}-[0-9]{3})+"
    output = re.findall(regex, text)
    print(output)


def extractGrades(text):
    reg = "(?<![-\.]|[0-9])([0-9]{1,3}(?![-\%\.\d]))"
    output = re.findall(reg, text)
    print(output)


if __name__ == '__main__':
    path = 'grd20181EN.pdf'
    parsePDF(path)