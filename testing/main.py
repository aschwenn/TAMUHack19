import re
from PyPDF2 import PdfFileReader

def parsePDF(path):
    with open(path, 'rb') as f:
        pdf = PdfFileReader(f)
        page = pdf.getPage(0)
        print('Page type : {}'.format(str(type(page))))

        text = page.extractText().encode('ascii', 'ignore')
        text = cleanText(text)
        text = cleanHeader(text)
        extractProf(text)
        extractCourses(text)
        extractGrades(text)
        extractGPA(text)
        # print(text)

def cleanText(text):
    # Remove Course Total statistics
    regex = "(COURSE TOTAL:[\s\S]*?(?=[A-Z]))"
    output = re.sub(regex, '', text)
    regex = "([0-9]+\.[0-9]+[%]\\n)"
    output = re.sub(regex, '', output)
    # print(output)
    return output

def cleanHeader(text):
    regex = "(SECTION[\s\S]*?Undergraduate\\n)|(SECTION[\s\S]*?Graduate\\n)"
    output = re.sub(regex, '', text)
    print(output)
    return output

def extractCourses(text):
    regex = "([A-Z]{4}-[0-9]{3}-[0-9]{3})+"
    output = re.findall(regex, text)
    print(output)


def extractGrades(text):
    regex = "(?<![-\.]|[0-9])([0-9]{1,3}(?![-\d]))"
    output = re.findall(regex, text)
    print(output)

def extractGPA(text):
    regex = "[0-9]{1}\.[0-9]{3}"
    output = re.findall(regex, text)
    print(output)

def extractProf(text):
    regex = "(?!\\n)[A-Z\s]+(?=\\n)"
    output = re.findall(regex, text)
    print(output)


if __name__ == '__main__':
    path = 'grd20181EN.pdf'
    parsePDF(path)