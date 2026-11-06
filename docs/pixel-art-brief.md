# Pixel art brief

Standing prompt for sub-agents that draw pixel art for the site. Fill the three bracketed slots and send the rest verbatim.

Existing sprites (don't duplicate): `public/sprites/fox-logo.png` and footer pets in `public/sprites/pets/` (bunny, crane, duck, elephant, flamingo, fox, frog, penguin, toucan, turtle). Grids for these live in `sprite-kit.zip` under `sprite-kit/grids/`.

Approved Heron references, with the house eyes: `art-work/eye-styles/mixed/` (the 10 pets plus giraffe, zebra, dog, black cat, ginger cat, owl, deer and robin). Walk and hop cycles for the pets, with their motion rules, are in `art-work/pet-variants/walks/`.

---

Create pixel art of [SUBJECTS, e.g. "a baby owl and a hedgehog"], using [COLOURS, e.g. "warm brown and cream for the owl, grey and tan for the hedgehog", or "colours that suit each subject"]. Show each subject [VIEW, e.g. "from the side, facing left, standing or sitting upright"].

Draw each sprite yourself as a text grid and render it to PNG with Python and Pillow. Do not use an image model, and do not copy an existing character, logo or artwork.

GRID FORMAT
Use JSON with a palette and rows:
{"palette": {"o": "#3A5C86", "h": "#FFFFFF"}, "rows": ["..oo..", ".ohho."]}
Each character is one pixel, "." is transparent, and every row must be the same length.

STYLE EXAMPLE
The house style is "Heron": tall, upright, slender poses in true natural colours. Match this sitting fox's size, posture, eye, simplicity and shading, but do not copy its body or colours.

Palette:
{"o": "#7A2E10", "h": "#F49A5A", "f": "#D9622A", "s": "#B04A1C", "e": "#1E0C06", "w": "#FFF6EC", "k": "#2A1810", "E": "#FFFFFF"}

Rows:
..o...o........
.oho.oho.......
.ohhhhhfo......
.ohEeffffo.....
ohfeefffo......
kwwfffffo......
.owwwffo.......
..owwffo.......
..owwfffo......
..owwffffo.....
..owwfffsfo....
..owwffssfo..oo
..okwffsssfoowo
..okwffssssowwo
..okkfssssshfso
..okkosssshffso
..ookoossooooo.
...oo.ooo......

DESIGN RULES
- Size: about 11-17 pixels wide and 13-19 tall. Keep compact subjects (frogs, small birds) at the shorter end so they do not look stretched.
- Pose: upright and slender, standing or sitting tall, with long necks, ears and legs where the animal has them. Keep the head and eye clear.
- Shape: simple, clean shapes with one or two features that make the subject recognisable.
- Colour: use 6-9 flat colours true to the real animal (a wild-brown rabbit, a grey elephant, a mallard drake), including a pale highlight, a main colour and a darker shade.
- Light: place highlights on the top and front, with shade towards the back and underside.
- Outline: use a closed line, 1 pixel thick, in a deep tone of the main colour, not black. Very dark subjects may use a near-black outline. Beaks, tail tips and thin legs may go without one.
- Eyes: choose by how pale the face is beside the eye. On a pale face (white, cream, pale pink, pale grey, pale green or pale tan, about 0.7 relative luminance or lighter), draw two dark pixels stacked vertically. On a mid or dark face, draw a 2x2 block with a white catchlight in the top front corner (top left when facing left) and dark pixels in the other three. Only animals whose big eyes define them, like owls, get a rounded 3x3: the 2x2 plus dark pixels above and in front of the catchlight, leaving the top-front, top-back and bottom-front corners as face colour. Ring the whole eye with face colour on all four sides: it must not touch the outline or merge with a dark body. Make the head big enough to fit this, and keep the eye off muzzles, beaks and markings. If the head is dark, add a pale face patch around the eye.
- Face: add no extra eye highlights, eyelashes, eyebrows, blush or smile. Use only a small nose, beak or mouth pixel where the animal needs one.
- Finish: add no anti-aliasing, gradients, dithering, text, shadows, ground or background.

OUTPUT
For each sprite, save:
- The grid as <name>.json
- A transparent PNG at native size as <name>.png
- A transparent PNG at 8x as <name>@8x.png, using nearest-neighbour scaling

Also make one contact sheet showing every sprite at the same scale, once on cream (#F7F3EA) and once on charcoal (#1F2120).

CHECK BEFORE FINISHING
1. Run code to confirm that rows are equal in length, every character is in the palette, and all pixels are fully opaque or fully transparent.
2. Run code to confirm that every eye pixel (dark and catchlight) has non-outline, non-transparent pixels on every side that faces away from the eye, and that each sprite is one connected shape.
3. Open the contact sheet and look at it. If a sprite doesn't read as its subject straight away, redraw it.
4. Check that the sprites look like one family at the same scale, and match the Heron style example.

Show me the contact sheet and the 8x PNGs, and mention any sprite you think is weakest.
