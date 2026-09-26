# Case study: Aurora Community Museum virtual exhibit

*A fictional capstone project, built for the XR Camp course, used here only to illustrate what a finished Stage 5 case study looks like.*

## The problem

The Aurora Community Museum (fictional, modelled on a small local heritage museum) has one paid room and limited opening hours. Visitors who cannot travel there — because of distance, cost, mobility, or opening times — had no way to see its textile and pottery collection.

## What I built

A free, single-room virtual exhibit: three exhibit objects (a clay pot, a woven basket ring, and a jade stone, all built from three.js primitives rather than photographs, to sidestep any image-licensing risk), each with a description read by anyone using a screen reader, and every interaction reachable by keyboard alone. The exhibit's text lives in one small data file, ready for translation into Spanish and Simplified Chinese later.

## What I left out, and why

A booking system for in-person visits, user accounts, and a native mobile app were all named out of scope back in Stage 1, and stayed out of scope through to release — each would have needed integrations or review processes this capstone's five stages could not support.

## What I learned

Writing the scene description and the 2D twin list from one shared piece of data, instead of two separately hand-written strings, turned out to be the single decision that saved the most time: every later change to an object's text updated both automatically. My honest struggle was accessibility feedback loops — my Stage 3 design review caught a Pause button whose visible label changed too slowly to feel trustworthy, and fixing it taught me to treat a screen reader and a sighted walkthrough as two separate tests, not one.
