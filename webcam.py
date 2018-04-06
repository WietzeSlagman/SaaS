from collections import deque
import numpy as np
import sys
import imutils
import cv2

def detectObject(frame, lower, upper):
    frame = imutils.resize(frame, width=600)

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    mask = cv2.inRange(hsv, lower, upper)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)

    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
    center = None

    if len(cnts) > 0:
        return cnts[0]
    return None


def calculateDistance(cnts):
    rectSize = cv2.minAreaRect(cnts)

    return (rectSize * KNOWN_DISTANCE) / KNOWN_WIDTH

def main():
    #redLower = (170, 200, 200)
    #redUpper = (179, 255, 255)
    lower = (29, 86, 6)
    upper = (64, 255, 255)

    #frame = sys.argv[1]

    cv2.namedWindow("preview")
    vc = cv2.VideoCapture(0)

    if vc.isOpened(): # try to get the first frame
        rval, frame = vc.read()
    else:
        rval = False

    while rval:
        cv2.imshow("preview", frame)
        rval, frame = vc.read()
        detectObject(frame, lower, upper)
        key = cv2.waitKey(20)
        if key == 27: # exit on ESC
            break
    cv2.destroyWindow("preview")

    # contours = detectObject(frame, lower, upper)
    #
    # if contours:
    #     return calculateDistance(contours)
    # else:
    #     return None

if __name__ == '__main__':
    main()
