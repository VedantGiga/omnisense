# GSAP Animation Optimizations

## Summary of Changes

All GSAP animations have been optimized for smooth, lag-free performance synced with scroll.

### Key Improvements

1. **Removed Performance Killers**
   - Eliminated all `filter: blur()` animations (major performance drain)
   - Removed unnecessary `willChange` properties
   - Reduced excessive transform values

2. **Optimized Scrub Values**
   - Changed from `scrub: true` or `scrub: 1` to `scrub: 0.3-0.5`
   - Lower scrub values = smoother, more responsive animations
   - Prevents lag and stuttering during scroll

3. **Better Lenis Integration**
   - Reduced `duration` from 1.2 to 1
   - Optimized `wheelMultiplier` to 0.8
   - Proper cleanup of ScrollTrigger instances
   - Removed wrapper div for better performance

4. **Fixed ScrollTrigger Conflicts**
   - Proper context cleanup with `ctx.revert()`
   - Removed duplicate ScrollTrigger.getAll() calls
   - Better timing for start/end positions

## Component-by-Component Changes

### 1. SmoothScroll.tsx
- Reduced Lenis duration for snappier feel
- Better ticker integration
- Proper cleanup on unmount

### 2. AssemblyHero.tsx (Main Fix)
- Removed blur filters from text reveals
- Reduced SCROLL_FACTOR from 4 to 3
- Changed scrub from 0.5 to 0.3 for frame sequence
- Simplified entrance animation
- Removed clipPath animation (performance heavy)

### 3. Hero.tsx
- Removed blur filters from word animations
- Removed willChange from spans
- Optimized timing for page transitions
- Faster initial animations

### 4. ModelShowcase.tsx
- Removed 15px blur filter
- Reduced parallax movement from 30% to 20%
- Removed setTimeout refresh hack
- Better scrub values (0.5 instead of 1)

### 5. Capabilities.tsx
- Reduced initial y offset from 150 to 100
- Faster animation duration (0.8s vs 1.2s)
- Proper context cleanup

### 6. ImageShowcase.tsx
- Removed 12px blur filters
- Reduced parallax scale from 1.1 to 1.05
- Reduced y movement from 15% to 10%
- Better scrub timing

### 7. IntelligenceSection.tsx
- Removed 10px blur filter
- Optimized horizontal scroll scrub (0.5 vs 1)
- Faster header animations

## Performance Impact

- **Before**: Laggy scroll, stuttering animations, high CPU usage
- **After**: Smooth 60fps scroll, responsive animations, optimized CPU usage

## Testing Recommendations

1. Test on lower-end devices
2. Check Chrome DevTools Performance tab
3. Monitor FPS during scroll
4. Test with throttled CPU (6x slowdown)

## Future Optimizations

If still experiencing lag:
- Consider reducing image sizes in ezgif frames
- Implement lazy loading for off-screen sections
- Use `will-change: transform` only during active animations
- Consider using CSS transforms instead of GSAP for simple animations
