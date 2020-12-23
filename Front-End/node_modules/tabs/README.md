##Usage:
	
First you should build the markup as follows, 'tab' and 'tab-pane' are required, use them to indicate which are tabs and content panes. 

```html
<div class="tab-container">
	<div class="tabs">
		<a class="tab active">Home</a>
		<a class="tab">Profile</a>
		<a class="tab">Messages</a>
	</div>
	<div class="tab-panes">
		<div class="tab-pane active">home</div>
		<div class="tab-pane">profile</div>
		<div class="tab-pane" >message</div>
	</div>
</div>
```

And with the styles that hides the non-active tab pane

```css
.tab-panes .tab-pane{
	display: none
}
.tab-panes .active{
	display: block
}
```

Finally makes the markup tabbable. After a tab is clicked, the 'active' class will be added to the corresponding tab:

```javascript
//commonjs
var tabs = require('tabs');

//or directly include the script and 'tabs' will be global

// make it tabbable!
var container=document.querySelector('.tab-container')
tabs(container);
```
##Example:
	
See http://ltebean.github.io/tabs