# CSS Architecture
Global settings for all parts, separate some common settings to one file. It is easy to maintain.  
Good CSS levels to avoid duplicate definition
## base.less - Provide style reset and atomic functions
- the project module styles
- body styles
- font-family
- font-size
- color
- width factor
- common width
## common.less - Abstract the component styles common to the site.
- page layout
- responsive width
- common component styles
## page.less - A particular style of a particular page.
- **All function pages must have their scope**
- **Defining global styles is prohibited**

# CSS Written Order 
- Location attribute (position, top, right, z-index, display, float ...)
- Size (width, height, padding, margin ...)
- Text series (font, line-height, letter-spacing, color- text-align ...)
- Background (background, border ...)
- Other (animation, transition ...)

# CSS Written Standard
## abbreviation
### CSS has some properties that can be abbreviated, such as padding, margin, font, etc. This streamlines the code while improving the user's reading experience.

![clipboard.png](https://wheeler-front-end.oss-cn-beijing.aliyuncs.com/css1.png)

### Remove the "0" before the decimal point

![clipboard.png](https://wheeler-front-end.oss-cn-beijing.aliyuncs.com/css2.png)  

### Abbreviated name-Easy to understand, but not casual.

![clipboard.png](https://wheeler-front-end.oss-cn-beijing.aliyuncs.com/css3.png)

### Hyphenated CSS selector naming convention
Long names or phrases can use the middle dash to name selectors.
It is not recommended to use the "_" underscore to name the CSS selector. Why?
1. Press the shift key a little while typing.
2. Browser compatibility issues (named after a selector using _tips, for example, is invalid in IE6)
3. Well-distributed JavaScript variable naming (JS variable name is "_")

### Do not use id freely
The ID is unique and high priority, so we should use it on demand.

# Less usage
## Variables
```
@nice-blue: #5B83AD;
#header {
	color: @nice-blue;
}
```
We can define the font, size, color, etc. as constants.

## Mixins
```
.bordered {
	border-top: dotted 1px black;
	border-bottom: solid 2px black;
}

.post a {
	color: red;
	.bordered;
}
```
We can transfer variables, Usage is similar to functions

## Nested Rules
```
.header {
	color: black;
}

.header .navigation {
	font-size: 12px;
}

.header-logo {
	width: 300px;
}


.header {
	.navigation {
		font-size: 12px;
	}
	&-logo {
		width: 300px;
	}
}
```
Directives such as media or keyframe can be nested in the same way as selectors. 

## Namespaces and Accessors
```
#bundle {
	.button {
		display: block;
		border: 1px solid black;
		background-color: grey;
		&:hover {
			background-color: white
		}
	}
	.tab {
	...
	}
	.citation {
	...
	}
}
```
We should use the component's namespace and scope.

## Scope
```
@var: red;
#page {
   @var: white;
   #header {
      color: @var; // white
   }
}
```
