import re
import csv
from PyPDF2 import PdfFileReader

def parsePDF(path):
    with open(path, 'rb') as f:
        pdf = PdfFileReader(f)
        page = pdf.getPage(0)
        # print('Page type : {}'.format(str(type(page))))

        text = page.extractText().encode('ascii', 'ignore')
        if isNotEmpty(text):
            text = cleanText(text)
            text = cleanHeader(text)
            profs = extractProf(text)
            courses = extractCourses(text)
            grades = extractGrades(text)
            gpa = extractGPA(text)
            outputCSV(profs, courses, grades, gpa)
            # print(text)

def isNotEmpty(text):
    regex = "[A-Z]{4}-[0-9]{3}-[0-9]{3}"
    # print(bool(re.search(regex, text)))
    return bool(re.search(regex, text))


def cleanText(text):
    # Remove Course Total statistics
    regex = "(COURSE TOTAL:[\s\S]*?(?=[A-Z]))|(DEPARTMENT TOTAL:)"
    output = re.sub(regex, '', text)
    regex = "([0-9]+\.[0-9]+[%]\\n)"
    output = re.sub(regex, '', output)
    # print(output)
    return output

def cleanHeader(text):
    regex = "^[\s\S]*?(?=[A-Z]{4}-[0-9]{3}-[0-9]{3})"
    output = re.sub(regex, '', text)
    # print(output)
    return output

def extractCourses(text):
    regex = "([A-Z]{4}-[0-9]{3}-[0-9]{3})+"
    output = re.findall(regex, text)
    # print(output)
    return output


def extractGrades(text):
    regex = "(?<![-\.]|[0-9])([0-9]{1,3}(?![-\d]))"
    output = re.findall(regex, text)
    # print(output)
    return output

def extractGPA(text):
    regex = "[0-9]{1}\.[0-9]{3}"
    output = re.findall(regex, text)
    # print(output)
    return output

def extractProf(text):
    regex = "(?!\\n)[A-Z\s]+(?=\\n)"
    output = re.findall(regex, text)
    # print(output)
    return output

def outputCSV(profs, courses, grades, gpa):
    with open('data.csv', mode='w') as data_file:
        data_writer = csv.writer(data_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        data_writer.writerow(courses)
        data_writer.writerow(profs)
        data_writer.writerow(grades)
        data_writer.writerow(gpa)



if __name__ == '__main__':
    path = 'grd20181EN.pdf'
    parsePDF(path)