import re
import csv
import os
from PyPDF2 import PdfFileReader

def parsePDF(path):
    # Clean old data file
    if os.path.exists('data.csv'):
        os.remove('data.csv')
    with open(path, 'rb') as f:
        pdf = PdfFileReader(f)
        profs = []
        courses = []
        gpa =[]
        for i in range(pdf.numPages):
            page = pdf.getPage(i)
            # print('Page type : {}'.format(str(type(page))))

            # Encode to ASCII to remove unintentional Unicode characters
            text = page.extractText().encode('ascii', 'ignore')
            # Check to make sure PDF page is not empty (has at least 1 course)
            if isNotEmpty(text):
                # Remove percentages, header text, and course and department totals
                text = cleanText(text)
                text = cleanHeader(text)
                # Group each data type into lists
                profs += extractProf(text)
                courses += extractCourses(text)
                # grades = extractGrades(text)
                gpa += extractGPA(text)
                # print(text)

        # Output lists to CSV
        outputCSV(profs, courses, gpa)
        # sortData()


def isNotEmpty(text):
    regex = "[A-Z]{4}-[0-9]{3}-[0-9]{3}"
    # print(bool(re.search(regex, text)))
    return bool(re.search(regex, text))


def cleanText(text):
    # Remove Course Total statistics
    regex = "(COURSE TOTAL:[\s\S]*?(?=[A-Z]))|(DEPARTMENT TOTAL:[\s\S]*(?![A-Z]))"
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
    regex = "(?<=\\n)[A-Z ]+(?=\\n)"
    output = re.findall(regex, text)
    # print(output)
    return output

def outputCSV(profs, courses, gpa):
    with open('data.csv', mode='a') as data_file:
        data_writer = csv.writer(data_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        data_writer.writerow(courses)
        data_writer.writerow(profs)
        # data_writer.writerow(grades)
        data_writer.writerow(gpa)

def sortData():
    with open('data.csv', mode='rb') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            numOfRowElements = (len(list(row)))
            for i in range(numOfRowElements):
                temp = ''
                c = row[i]
                dept = c[0:4]
                course = c[5:8]
                section = c[9:12]
                temp = dept + ',' + course + ',' + section + ','
                print temp
                csv_reader.next()

                p = row[i]
                print p
                name = p.rsplit(' ', 1)
                lastName = name[0]
                firstName = name[1]
                temp += lastName + ',' + firstName + ','
                csv_reader.next()

                temp += row[i]
                print temp


if __name__ == '__main__':
    path = 'grd20181EN.pdf'
    parsePDF(path)