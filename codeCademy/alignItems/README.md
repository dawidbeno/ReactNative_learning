## Align Items
The `alignItems` property determines how children are aligned along the cross axis of a container—the axis perpendicular to the main axis, which is set by the flexDirection property. For example, if our main axis runs horizontally (flexDirection: 'row'), the cross axis runs vertically, and vice versa.

## Options
Here are the options available for alignItems:

- **stretch** (default): stretches children to fill the container along the cross-axis
- **flex-start**: aligns children to the start of the cross-axis
- **flex-end**: aligns children to the end of the cross-axis
- **center**: aligns children in the center of the cross-axis
- **baseline**: Aligns children along a common baseline, which is especially useful when working with text or components of varying heights. Individual children can be set to define the reference baseline for their parents.

By adjusting `alignItems`, we can control our components’ vertical or horizontal alignment (depending on the flex direction), making our layouts more flexible and enabling us to keep things visually balanced.

