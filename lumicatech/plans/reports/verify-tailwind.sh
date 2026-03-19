#!/bin/bash

echo "=== Tailwind CSS v4 Verification Script ==="
echo ""

# Check if CSS file exists
echo "1. Checking if CSS file exists..."
CSS_FILE=$(find .next/dev/static/chunks -name "*globals*" -type f 2>/dev/null | head -1)
if [ -n "$CSS_FILE" ]; then
    echo "   ✅ CSS file found: $CSS_FILE"
    echo "   Size: $(du -h "$CSS_FILE" | cut -f1)"
    echo "   Lines: $(wc -l < "$CSS_FILE")"
else
    echo "   ❌ CSS file not found"
fi
echo ""

# Check for custom utilities
echo "2. Checking for custom utilities..."
if [ -n "$CSS_FILE" ]; then
    if grep -q "\.bg-primary" "$CSS_FILE"; then
        echo "   ✅ .bg-primary found"
    else
        echo "   ❌ .bg-primary NOT found"
    fi

    if grep -q "\.text-dark" "$CSS_FILE"; then
        echo "   ✅ .text-dark found"
    else
        echo "   ❌ .text-dark NOT found"
    fi

    if grep -q "\.rounded-custom" "$CSS_FILE"; then
        echo "   ✅ .rounded-custom found"
    else
        echo "   ❌ .rounded-custom NOT found"
    fi
fi
echo ""

# Check CSS variables
echo "3. Checking CSS variables..."
if [ -n "$CSS_FILE" ]; then
    if grep -q "color-primary:" "$CSS_FILE"; then
        echo "   ✅ --color-primary defined"
    else
        echo "   ❌ --color-primary NOT defined"
    fi

    if grep -q "color-dark:" "$CSS_FILE"; then
        echo "   ✅ --color-dark defined"
    else
        echo "   ❌ --color-dark NOT defined"
    fi

    if grep -q "radius-custom:" "$CSS_FILE"; then
        echo "   ✅ --radius-custom defined"
    else
        echo "   ❌ --radius-custom NOT defined"
    fi
fi
echo ""

# Check config files
echo "4. Checking configuration files..."
if [ -f "postcss.config.mjs" ]; then
    echo "   ✅ postcss.config.mjs exists"
else
    echo "   ❌ postcss.config.mjs NOT found"
fi

if [ -f "postcss.config.js" ]; then
    echo "   ⚠️  postcss.config.js exists (duplicate - should be removed)"
else
    echo "   ✅ postcss.config.js not found (good)"
fi

if [ -f "app/globals.css" ]; then
    echo "   ✅ app/globals.css exists"
    if grep -q '@import "tailwindcss"' "app/globals.css"; then
        echo "   ✅ @import \"tailwindcss\" found"
    else
        echo "   ❌ @import \"tailwindcss\" NOT found"
    fi
else
    echo "   ❌ app/globals.css NOT found"
fi
echo ""

echo "=== Verification Complete ==="
echo ""
echo "If all checks passed but styles still don't appear:"
echo "1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)"
echo "2. Restart dev server: Ctrl+C then 'npm run dev'"
echo "3. Try in incognito/private mode"
echo "4. Check browser console for errors"
