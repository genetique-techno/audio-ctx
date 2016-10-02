//do stuff
// ctx.moveTo(x, y)
// ctx.arc(cx, cy, radius, startAngle, endAngle, CCW?)  Angles in rad
// ctx.arcTo(x1, y1, x2, y2, radians)
// ctx.rect(x, y, width, height)
// new Path2D([d or path object or empty]) - everything after is defined on this Path2D instance...then you can fill(Path2D) or stroke(Path2D)
// ctx.fill([obj])
// ctx.lineTo(x, y)
// ctx.fillStyle = color
// ctx.strokeStyle = color
// ctx.globalAlpha = alpha value - applies to all newly created shapes on the context
// ctx.lineWidth
// ctx.lineCap = ['butt', 'round', 'square']
// ctx.lineJoin = ['round', 'bevel', 'miter']
// ctx.miterLimit
// ctx.getLineDash()
// ctx.setLineDash( segments )
// ctx.lineDashOffset
//
// ctx.createLinearGradient(x1, y1, x2, y2)
// ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
// gradient.addColorStop(position, color)
//
// ctx.createPattern(image, type)
//
// shadowOffsetX = float
// shadowOffsetY = float
// shadowBlur = float
// shadowColor = color
//
// ctx.fillText(text, x, y [, maxWidth])
// ctx.strokeText(text, x, y [, maxWidth])
//
// ctx.save() - save canvas state onto stack
// ctx.restore() - pop canvas state from stack
//
// ctx.translate(x, y) - translate canvas coordinates without moving anything
// ctx.rotate(angle) - rotate canvas coords without moving anything
// ctx.scale(x, y)
//
// animations:
// 1. clear canvas
// 2. save state
// 3. animate
// 4. restore state
