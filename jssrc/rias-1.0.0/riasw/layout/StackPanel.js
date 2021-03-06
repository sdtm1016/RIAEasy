
//RIAStudio client runtime widget - StackPanel

define([
	"rias",
	"dijit/_WidgetBase",
	"rias/riasw/layout/_PanelBase"
], function(rias, _WidgetBase, _PanelBase){

	//rias.theme.loadRiasCss([
	//	"layout/Panel.css"
	//]);

	var riasType = "rias.riasw.layout.StackPanel";
	var Widget = rias.declare(riasType, _PanelBase, {

		doLayout: true,
		persist: false,

		_transitionDeferred: null,

		baseClass: "riaswStackPanel",

		/*=====
		// selectedChildWidget: [readonly] dijit._Widget
		//		References the currently selected child widget, if any.
		//		Adjust selected child with selectChild() method.
		selectedChildWidget: null,
		=====*/

		//postMixInProperties: function(){
		//	this.inherited(arguments);
		//},
		buildRendering: function(){
			this.inherited(arguments);
			//rias.dom.addClass(this.domNode, "dijitLayoutContainer");
		},

		postCreate: function(){
			var self = this;
			self.inherited(arguments);
			self.own(
				rias.on(self.domNode, "keydown", rias.hitch(self, "_onKeyDown")),
				///rias.subscribe(self.id + "-selectChild", rias.hitch(self, "_onShowChild")),///没必要
				rias.subscribe(self.id + "-startup", function(params){
					if(params.selected){
						self._transition(params.selected);
						rias.publish(self.id + "-selectChild", params.selected);
					}
				})
			);
		},

		destroyDescendants: function(/*Boolean*/ preserveDom){
			//this._descendantsBeingDestroyed = true;
			this.selectedChildWidget = undefined;
			rias.forEach(this.getChildren(), function(child){
				this.removeChild(child, false, preserveDom);
				child.destroyRecursive(preserveDom);
			}, this);
			//rias.forEach(this.__reserved_page, function(child){
			//	child.destroyRecursive(preserveDom);
			//}, this);
			//this.__reserved_page = undefined;
			//this._descendantsBeingDestroyed = false;
		},
		destroy: function(){
			if(this._animation){
				rias.forEach(this._animation, function(item){
					item.stop();
				});
				this._animation = undefined;
			}
			if(this._transitionDeferred){
				this._transitionDeferred.cancel();
				this._transitionDeferred = undefined;
			}
			this.inherited(arguments);
		},

		startup: function(){
			if(this._started){
				return;
			}

			var children = this.getChildren();

			// Setup each page panel to be initially hidden
			rias.forEach(children, function(child){
				this._setupChild(child);
			}, this);

			// Figure out which child to initially display, defaulting to first one
			if(this.persist){
				//this.selectedChildWidget = rias.registry.byId(cookie(this.id + "_selectedChild"));
				this.selectedChildWidget = rias.by(rias.cookie(this.id + "_selectedChild"));
			}else{
				rias.some(children, function(child){
					if(child.selected){
						this.selectedChildWidget = child;
					}
					return child.selected;
				}, this);
			}
			var selected = this.selectedChildWidget;
			if(!selected && children[0]){
				selected = this.selectedChildWidget = children[0];
				selected.selected = true;
			}
			// Startup each child widget, and do initial layout like setting this._contentBox,
			// then calls this.resize() which does the initial sizing on the selected child.
			this.inherited(arguments);

			///需要先 inherited 设置 __updateSize，然后再 resize
			// Publish information about myself so any StackControllers can initialize.
			// This needs to happen before this.inherited(arguments) so that for
			// TabPanel, this._contentBox doesn't include the space for the tab labels.
			rias.publish(this.id + "-startup", {children: children, selected: selected, textDir: this.textDir});

		},

		//resize: function(changeSize, resultSize){
		//	this.inherited(arguments);
		//},

		_layoutChildren: function(/*String?*/ changedChildId, /*Object?*/ changedChildSize){
			var child = rias.by(changedChildId) || this.selectedChildWidget;
			if(child && !child.isDestroyed(true)){
				this._noOverflowCall(function(){
					if(child.resize){
						if(changedChildSize || this.doLayout){
							//this._containerContentBox = this._contentBox;
							/// 尺寸取 this.containerNode 的 contentBox，即 this._contentBox，但是位置是 child._wrapper，
							this._containerContentBox = rias.dom.marginBox2contentBox(child._wrapper, this._contentBox);
							//this._containerContentBox.l = 0;
							//this._containerContentBox.t = 0;
							changedChildSize = rias.mixin({}, this._containerContentBox, changedChildSize);
							child.resize(changedChildSize);
						}else{
							child.resize();
						}
					}
				});
			}
			return true;
		},
		_beforeLayout: function(){
			var box,
				node = this.domNode;
			box = rias.dom.getContentBox(node);
			if(!box || !this._contentBox || Math.abs(box.l - this._contentBox.l) > 0.5 || Math.abs(box.t - this._contentBox.t) > 0.5 ||
				Math.abs(box.w - this._contentBox.w) > 0.01 || Math.abs(box.h - this._contentBox.h) > 0.01){
				////if(this.needLayout || !box || !this._contentBox || box.w != this._contentBox.w || box.h != this._contentBox.h){
				this._contentBox = box;
				this.needLayout = true;
			}
			return this.beforeLayout(this.needLayout || this._needResizeChild);
		},

		_setupChild: function(/*dijit/_WidgetBase*/ child, added, insertIndex, noresize){
			if(!added){
				this.inherited(arguments);
				return;
			}
			// For aria support, wrap child widget in a <div role="tabpanel">
			var childNode = child.domNode,
				wrapper = rias.dom.place(
					//"<div role='tabpanel' class='dijitLayoutContainer " + this.baseClass + "ChildWrapper dijitHidden'>",
					"<div role='tabpanel' class='" + this.baseClass + "ChildWrapper dijitHidden'>",
					child.domNode,
					"replace"),
				label = child["aria-label"] || child.title || child.label;
			if(label){
				// setAttribute() escapes special chars, and if() statement avoids setting aria-label="undefined"
				wrapper.setAttribute("aria-label", label);
			}
			rias.dom.place(childNode, wrapper);
			///需要设置 wrapperNode，以在 resize 的时候可以设置 wrapperNode
			/// 可能存在 child.wrapperNode，比如 CaptionPanel。
			//child._wrapper = child.wrapperNode = wrapper;	// to set the aria-labelledby in StackController
			child._wrapper = wrapper;	// to set the aria-labelledby in StackController

			rias.publish(this.id + "-addChild", child, insertIndex);

			// child may have style="display: none" (at least our test cases do), so remove that
			if(added && childNode.style.display == "none"){
				childNode.style.display = "block";
			}

			// remove the title attribute so it doesn't show up when i hover over a node
			child.domNode.removeAttribute("title");

			this.inherited(arguments);
		},

		addChild: function(/*dijit/_WidgetBase*/ child, /*Integer?*/ insertIndex, noresize){
			var //cs = this.getChildren(),
				p = this;
			child._focusStack0 = child._focusStack;
			child._focusStack = true;
			this.inherited(arguments);
			if(this._started){
				//console.debug("addChild - ", child.id.split('_').pop(), this.selectedChildWidget ? this.selectedChildWidget.id.split('_').pop() : "undefined");
				if(child.selected || !this.selectedChildWidget){
					this.selectChild(child, false);
				}
			}
			//var i = rias.indexOf(this.__reserved_page, child);
			//if(i >= 0){
			//	this.__reserved_page.splice(i, 1);
			//}
		},
		removeChild: function(/*dijit/_WidgetBase*/ child, noresize, reserve){
			var idx = rias.indexOf(this.getChildren(), child);
			//if(!this.__reserved_page){
			//	this.__reserved_page = [];
			//}
			//if(reserve){
			//	this.__reserved_page.push(child);
			//	child._wrapper.removeChild(child.domNode);
			//}
			child._focusStack = child._focusStack0;
			if(this.selectedChildWidget === child){
				this.selectedChildWidget = undefined;
				if(this._started){
					this.back();
				}
			}
			this.inherited(arguments);

			rias.dom.destroy(child._wrapper);
			child._wrapper = undefined;

			if(this._started){
				rias.publish(this.id + "-removeChild", child);
			}

			//if(this._descendantsBeingDestroyed){
			//	return;
			//}
		},

		selectChild: function(/*dijit/_WidgetBase|String*/ page, /*Boolean*/ animate){
			// summary:
			//		Show the given widget (which must be one of my children)
			// page:
			//		Reference to child widget or id of child widget

			var self = this,
				d = self.selectedChildWidget;

			//page = rias.registry.byId(page);
			page = rias.by(page);

			if(!page){
				page = this.getChildren()[0];
			}
			if(self.selectedChildWidget != page){
				///先设置 selectedChildWidget，以保证在 _transition.showChild 中 selectedChildWidget 正确
				///同时，注意 _transition 的 new 和 old 是否正确
				self._set("selectedChildWidget", page);
				//console.debug("selectedChildWidget: ", page.id.split('_').pop());
				// Deselect old page and select new one
				d = self._transition(page, d, animate);
				d.then(function(){
					rias.publish(self.id + "-selectChild", page);	// publish
					if(self.persist){
						rias.cookie(self.id + "_selectedChild", self.selectedChildWidget.id);
					}
					//console.debug("selectChild - ", page.id);
					page.focus();
				});
			}

			// d may be null, or a scalar like true.  Return a promise in all cases
			return rias.when(d || true);		// Promise
		},

		_transition: function(newWidget, oldWidget, animate){
			var self = this,
				df = rias.newDeferred();

			if(rias.has("ie") < 8){
				// workaround animation bugs by not animating; not worth supporting animation for IE6 & 7
				animate = false;
			}
			if(self._animation){
				rias.forEach(this._animation, function(item){
					item.stop();
				});
				self._animation = undefined;
			}
			if(self._transitionDeferred){
				self._transitionDeferred.cancel();
			}
			self._transitionDeferred = df;
			if(oldWidget && (oldWidget.isDestroyed(true))){
				oldWidget = undefined;
			}
			//if(oldWidget && rias.isFunction(oldWidget._stopPlay)){
			//	oldWidget._stopPlay();
			//}
			//animate = false;
			if(newWidget){
				rias.dom.toggleClass(newWidget._wrapper, this.baseClass + "ChildWrapperTop", true);
				if(oldWidget){
					rias.dom.toggleClass(oldWidget._wrapper, this.baseClass + "ChildWrapperTop", false);
					if(animate != false){
						var curr = new Date().valueOf();
						var newContents = newWidget._wrapper,
							oldContents = oldWidget._wrapper,
							box = this._containerContentBox || this._contentBox;
						//console.debug("_transition.begin: ", self.id, new Date().valueOf() - curr);
						curr = new Date().valueOf();

						rias.dom.visible(newContents, true, 0);
						rias.when(self._showChild(newWidget, {
							animate: false
						}), function(){
							//console.debug("_transition._showChild: ", self.id, new Date().valueOf() - curr);
							curr = new Date().valueOf();
							rias.dom.setStyle(newContents, "left", -box.w + "px");
							rias.dom.visible(newContents, true, 1);
							self._animation = [rias.fx.combine([
								rias.fx.slideTo({
									node: oldContents,
									duration: self.duration,
									left: box.w
								}), rias.fx.slideTo({
									node: newContents,
									duration: self.duration,
									left: 0
								})
							])];
							//console.debug("_transition.playBegin: ", self.id, new Date().valueOf() - curr);
							curr = new Date().valueOf();
							df.then(function(){
								rias.when(self._hideChild(oldWidget, {
									animate: false
								}), function(){
									oldContents.style.left = "0px";
									//console.debug("_transition._hideChild: ", self.id, new Date().valueOf() - curr);
									curr = new Date().valueOf();
								});
							});
							self._animation[0].onEnd = function(){
								//console.debug("_transition.playEnd: ", self.id, new Date().valueOf() - curr);
								curr = new Date().valueOf();
								df.resolve();
							};
							self._animation[0].onStop = function(){
								//console.debug("_transition.playStop: ", self.id, new Date().valueOf() - curr);
								curr = new Date().valueOf();
								df.resolve();
							};
							self._animation[0].play();
						});

					}else{
						rias.when(self._hideChild(oldWidget, {
							animate: true
						}), function(){
							rias.when(self._showChild(newWidget, {
								animate: true
							}), function(){
								df.resolve();
							});
						});
					}
				}else{
					rias.when(self._showChild(newWidget, {
						animate: true
					}), function(){
						df.resolve();
					});
				}
			}else{
				df.resolve();
			}

			df.then(function(){
			});
			return df;
		},

		_adjacent: function(/*Boolean*/ forward){
			// summary:
			//		Gets the next/previous child widget in this container from the current selection.

			var children = rias.filter(this.getChildren(), function(child){
				return !child.isDestroyed(true) && !child.get("disabled");
			});
			var index = rias.indexOf(children, this.selectedChildWidget);
			index += forward ? 1 : children.length - 1;
			return children[ index % children.length ]; // dijit/_WidgetBase
		},

		forward: function(){
			// summary:
			//		Advance to next page.
			return this.selectChild(this._adjacent(true), true);
		},

		back: function(){
			// summary:
			//		Go back to previous page.
			return this.selectChild(this._adjacent(false), true);
		},

		_onKeyDown: function(e){
			rias.publish(this.id + "-containerKeyDown", { e: e, page: this});	// publish
		},

		onShowChild: function(page){
		},
		_onShowChild: function(page){
			//console.debug(this.id + "._onShowChild(" + (page ? page.id : "") + ")");
			this.needLayout = true;//this._isShown();
			//this.layout();
			this._resizeParent();
			this.onShowChild(page);
		},
		_showChild: function(/*dijit/_WidgetBase*/ page, /*Object*/ args){
			// summary:
			//		Show the specified child by changing it's CSS, and call _onShow()/onShow() so
			//		it can do any updates it needs regarding loading href's etc.
			// returns:
			//		Promise that fires when page has finished showing, or true if there's no href
			var children = this.getChildren();
			page.isFirstChild = (page == children[0]);
			page.isLastChild = (page == children[children.length - 1]);
			page._set("selected", true);

			if(page._wrapper){	// false if not started yet
				rias.dom.replaceClass(page._wrapper, "dijitVisible", "dijitHidden");
			}

			//// 有可能初始化时缺少 this._containerContentBox || this._contentBox，改为用 layout
			// Size the new widget, in case this is the first time it's being shown,
			// or I have been resized since the last time it was shown.
			// Note that page must be visible for resizing to work.
			/*if(page.resize){
				if(this.doLayout){
					page.resize(this._containerContentBox || this._contentBox);
				}else{
					// the child should pick it's own size but we still need to call resize()
					// (with no arguments) to let the widget lay itself out
					page.resize();
				}
			}*/
			if(args && args.box){
				this._layoutChildren(page, args.box);
			}
			this._onShowChild(page);

			if(args && args.animate != false){
				d = this._doPlayContent().then(function(){
					(page._show && page._show()) || (page._onShow && page._onShow());
				});
			}else{
				var d, a = page.animate;
				if(a == true){
					page.animate = false;
				}
				d = (page._show && page._show()) || (page._onShow && page._onShow()) || true;
				page.animate = a;
			}
			return d;
		},

		onHideChild: function(page){
		},
		_onHideChild: function(page){
			this.onHideChild(page);
		},
		_hideChild: function(/*dijit/_WidgetBase*/ page, /*Object*/ args){
			// summary:
			//		Hide the specified child by changing it's CSS, and call _onHide() so
			//		it's notified.
			page._set("selected", false);

			if(page._wrapper){	// false if not started yet
				rias.dom.replaceClass(page._wrapper, "dijitHidden", "dijitVisible");
			}
			this._onHideChild(page);
			if(args && args.animate != false){
				return this._doPlayContent(false).then(function(){
					page._hide && page._hide() || page.onHide && page.onHide();
				});
			}else{
				var d, a = page.animate;
				if(a == true){
					page.animate = false;
				}
				d = page._hide && page._hide() || page.onHide && page.onHide() || true;
				page.animate = a;
				return d;
			}
		},

		closeChild: function(/*dijit/_WidgetBase*/ page, reserve){
			// summary:
			//		Callback when user clicks the [X] to remove a page.
			//		If onClose() returns true then remove and destroy the child.
			// tags:
			//		private
			if(rias.isFunction(page.close)){
				return page.close();
			}
			var go = true;
			if(rias.isFunction(page._onClose)){
				go = page._onClose();
			}else if(rias.isFunction(page.onClose)){
				go = page.onClose();
			}
			return rias.when(go, function(){
				this.removeChild(page, false, reserve);
				// makes sure we can clean up executeScripts in ContentPane onUnLoad
				page.destroyRecursive();
			});
		}

	});

	Widget.ChildWidgetProperties = {
		// summary:
		//		These properties can be specified for the children of a StackPanel.

		// selected: Boolean
		//		Specifies that this widget should be the initially displayed pane.
		//		Note: to change the selected child use `dijit/layout/StackPanel.selectChild`
		selected: false,

		// disabled: Boolean
		//		Specifies that the button to select this pane should be disabled.
		//		Doesn't affect programmatic selection of the pane, nor does it deselect the pane if it is currently selected.
		disabled: false,

		// closable: Boolean
		//		True if user can close (destroy) this child, such as (for example) clicking the X on the tab.
		closable: false,

		// iconClass: String
		//		CSS Class specifying icon to use in label associated with this pane.
		iconClass: "dijitNoIcon",

		// showCaption: Boolean
		//		When true, display title of this widget as tab label etc., rather than just using
		//		icon specified in iconClass
		showCaption: true
	};

	// Since any widget can be specified as a StackPanel child, mix them
	// into the base widget class.  (This is a hack, but it's effective.)
	// This is for the benefit of the parser.   Remove for 2.0.  Also, hide from doc viewer.
	rias.extend(_WidgetBase, /*===== {} || =====*/ Widget.ChildWidgetProperties);

	Widget._riasdMeta = {
		visual: true,
		iconClass: "riaswStackContainerIcon",
		iconClass16: "riaswStackContainerIcon16",
		defaultParams: {
			//content: "<span></span>",
			//doLayout: true,
			//duration: rias.defaultDuration
		},
		initialSize: {},
		//allowedChild: "",
		"property": {
			"doLayout": {
				"datatype": "boolean",
				"defaultValue": true,
				"hidden": true
			},
			"persist": {
				"datatype": "boolean",
				"description": "Remembers the selected child across sessions"
			},
			"selectedChildWidget": {
				"datatype": "object",
				"description": "References the currently selected child widget, if any",
				"hidden": true
			},
			"isContainer": {
				"datatype": "boolean",
				"description": "Just a flag indicating that this widget descends from dijit._Container",
				"hidden": true,
				"defaultValue": true
			}
		},
		"childProperties": {
			"selected": {
				"datatype": "boolean",
				"title": "Selected"
			},
			"closable": {
				"datatype": "boolean",
				"title": "Closable"
			}
		}
	};

	return Widget;
});
