# Beechanical Logo Placement Guide

## Logo Placement Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [LOGO (45px)] Home | About | Services | Projects | [CONTACT]  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
           NAVBAR - Purple SVG Logo (Horizontal)


┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [LOGO (50px)]          Footer Content                         │
│  Beechanical            Quick Links                            │
│  Engineering Solutions  Services                               │
│  Be like a bee.         Connect                                │
│                                                                 │
│  © 2026 Beechanical. All rights reserved.                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
           FOOTER - Purple SVG Logo (Horizontal)
```

## Detailed Specifications

### Navbar Logo
```
Position:    Left side of navigation bar
Size:        45px height × auto width
Color:       Purple (#4B2E83)
Type:        SVG (Full Logo Horizontal)
Class:       .logo-svg
Link:        Points to index.html (home page)
Hover:       Scales to 105% with smooth animation
Alignment:   Vertically centered with flexbox
```

### Footer Logo
```
Position:    Top-left of footer column
Size:        50px height × auto width
Color:       Purple (#4B2E83)
Type:        SVG (Full Logo Horizontal)
Class:       .footer-logo-svg
Link:        None (static display)
Hover:       Scales to 105% with smooth animation
Alignment:   Vertically centered with flexbox
```

## Logo Appearance

The logo displays:
- **Iconic Mark**: Two concentric circles (bee symbol) at top
- **Text**: "BEECHANICAL" wordmark below the icon
- **Full Brand**: Both mark and text in unified design
- **Color**: Solid purple for maximum brand impact

## Responsive Behavior

### Desktop View (>1024px)
- Navbar logo: 45px ✓
- Footer logo: 50px ✓
- Full text navigation visible
- Optimal viewing experience

### Tablet View (768px - 1024px)
- Navbar logo: 45px ✓
- Footer logo: 50px ✓
- Navigation may be condensed
- Logo remains prominent

### Mobile View (<768px)
- Navbar logo: 45px ✓
- Footer logo: 50px ✓
- Navigation menu collapses (hamburger)
- Logo remains clickable
- Logo anchors navigation

## Color Scheme

### Primary Brand Color (Current)
- **Name**: Purple
- **Hex**: #4B2E83
- **RGB**: 75, 46, 131
- **Usage**: Logo, headings, primary CTAs

### Secondary Color (Accent)
- **Name**: Yellow
- **Hex**: #F2B705
- **RGB**: 242, 183, 5
- **Usage**: Highlights, hover states, accents

## Logo SVG Content

The SVG contains:
- Viewbox: 0 0 3816.1 1080 (maintains aspect ratio)
- Namespace: http://www.w3.org/2000/svg
- Paths: Multiple <path> elements forming the bee mark and text
- Fill: Class-based (.logo-fill, .footer-logo-fill)

## Integration Points

### Files Using Navbar Logo:
1. index.html
2. about.html
3. services.html
4. projects.html
5. contact.html

### Files Using Footer Logo:
1. index.html
2. about.html
3. services.html
4. projects.html
5. contact.html

## Styling Reference

### CSS Classes Applied

**Navbar Container**
```css
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

**Logo Link (Navbar)**
```css
.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    transition: all 0.3s ease;
}

.logo-svg {
    height: 45px;
    width: auto;
    transition: all 0.3s ease;
}

.logo:hover .logo-svg {
    transform: scale(1.05);
}
```

**Logo Container (Footer)**
```css
.footer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.footer-logo-svg {
    height: 50px;
    width: auto;
    transition: all 0.3s ease;
}

.footer-logo:hover .footer-logo-svg {
    transform: scale(1.05);
}
```

## Logo Usage Rules

✓ **DO:**
- Use the purple logo on light backgrounds
- Maintain minimum 45px height in navbar
- Keep clear space around logo
- Use SVG format for quality
- Apply consistent sizing across pages

✗ **DON'T:**
- Modify logo proportions (always use auto width)
- Use without clear space
- Distort or rotate the logo
- Change primary color without approval
- Use below minimum sizes

## Accessibility Considerations

- Logo is wrapped in semantic `<a>` tags with href
- SVG is inline and doesn't require separate image requests
- Logo serves as homepage link (common UX pattern)
- High contrast purple on light backgrounds
- Keyboard accessible (part of navigation)

## Performance Notes

**Advantages of Embedded SVG:**
✓ No additional HTTP requests
✓ Smaller file size than PNG/JPG
✓ Crisp at all resolutions
✓ Easy color manipulation via CSS
✓ Scales smoothly on all devices
✓ Faster page load times

## Version Information

- **Logo Format**: SVG
- **Logo Version**: Full Logo Horizontal 1
- **Color Variant**: Purple (#4B2E83)
- **Integration Date**: February 2026
- **Status**: Production Ready

---

For any questions or modifications needed, refer to LOGO_INTEGRATION_SUMMARY.md for complete details.
