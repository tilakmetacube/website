
(function() {
    var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; l > i; i++)
            if (i in this && this[i] === item) return i;
        return -1
    };
    window.addEventListener("load", function() {
        var editor, editorCls, showTouchWarning, siteNav, siteNavToggle;
        return siteNav = document.querySelector(".site-nav"), siteNav && (siteNavToggle = document.querySelector(".site-nav__toggle"), siteNavToggle.addEventListener("click", function(ev) {
            return __indexOf.call(siteNav.classList, "site-nav--open") >= 0 ? siteNav.classList.remove("site-nav--open") : siteNav.classList.add("site-nav--open")
        })), window.addPermalinks = function() {
            var heading, headingId, headings, _i, _len, _results;
            for (headings = document.querySelectorAll(".formatted h2[id], .formatted h3[id]"), _results = [], _i = 0, _len = headings.length; _len > _i; _i++) heading = headings[_i], headingId = heading.getAttribute("id"), _results.push(heading.insertAdjacentHTML("beforeend", " <a href='#" + headingId + "' class='permalink'>Â¶</a>"));
            return _results
        }, window.removePermalinks = function() {
            var permalink, permalinks, _i, _len, _results;
            for (permalinks = document.querySelectorAll(".formatted h2[id] a.permalink, .formatted h3[id] a.permalink"), _results = [], _i = 0, _len = permalinks.length; _len > _i; _i++) permalink = permalinks[_i], _results.push(permalink.parentNode.removeChild(permalink));
            return _results
        }, addPermalinks(), document.querySelectorAll("[data-editable-demo]").length > 0 && (editor = new ContentTools.EditorApp.get, editor.init("[data-editable-demo]", "data-name"), editor.bind("save", function(regions, autoSave) {
            var saved;
            return editor.busy(!0), saved = function(_this) {
                return function() {
                    return editor.busy(!1), new ContentTools.FlashUI("ok")
                }
            }(this), setTimeout(saved, 1e3)
        }), editorCls = ContentTools.EditorApp.getCls(), editor.start = function() {
            return removePermalinks(), editorCls.prototype.start.call(this)
        }, editor.stop = function() {
            return editorCls.prototype.stop.call(this), addPermalinks()
        }, ContentTools.StylePalette.add([new ContentTools.Style("Definition", "definition", ["p"]), new ContentTools.Style("Note", "note", ["p"]), new ContentTools.Style("Vertical header", "v-head", ["table"])]), ContentTools.Tools.Heading.tagName = "h2", ContentTools.Tools.Subheading.tagName = "h3", ContentTools.IMAGE_UPLOADER = function(dialog) {
            var imagePath, imageSize, rotate, uploadingTimeout;
            return imagePath = "/images/pages/demo/landscape-in-eire.jpg", imageSize = [780, 366], uploadingTimeout = null, rotate = function() {
                var clearBusy;
                return dialog.busy(!0), clearBusy = function(_this) {
                    return function() {
                        return dialog.busy(!1)
                    }
                }(this), setTimeout(clearBusy, 1500)
            }, dialog.bind("imageUploader.cancelUpload", function() {
                return clearTimeout(uploadingTimeout), dialog.state("empty")
            }), dialog.bind("imageUploader.clear", function() {
                return dialog.clear()
            }), dialog.bind("imageUploader.fileReady", function(file) {
                var upload;
                return dialog.progress(0), dialog.state("uploading"), upload = function(_this) {
                    return function() {
                        var progress;
                        return progress = dialog.progress(), progress += 1, 100 >= progress ? (dialog.progress(progress), uploadingTimeout = setTimeout(upload, 25)) : dialog.populate(imagePath, imageSize)
                    }
                }(this), uploadingTimeout = setTimeout(upload, 25)
            }), dialog.bind("imageUploader.rotateCCW", function() {
                return rotate()
            }), dialog.bind("imageUploader.rotateCW", function() {
                return rotate()
            }), dialog.bind("imageUploader.save", function() {
                var clearBusy;
                return dialog.busy(!0), clearBusy = function(_this) {
                    return function() {
                        return dialog.busy(!1), dialog.save(imagePath, imageSize, {
                            alt: "Landscape in Eire"
                        })
                    }
                }(this), setTimeout(clearBusy, 1e3)
            })
        }, showTouchWarning = function(ev) {
            var warningButtonElement, warningElement;
            return ev.preventDefault(), window.removeEventListener("touchstart", showTouchWarning), warningElement = document.createElement("div"), warningElement.setAttribute("class", "warning"), warningElement.innerHTML = '<div class="warning__box">\n    <div class="warning__title">Using touch devices</div>\n    <div class="warning__message">\n        Looks like you may be using a touch device in which case it\'s only fair\n        to warn you that the editor is currently aimed at desktop devices and is\n        awkward (read unusable) on mobiles and tablets.\n    </div>\n    <div class="warning__button">OK</div>\n</div>', document.body.appendChild(warningElement), ContentEdit.addCSSClass(document.body, "ct--no-scroll"), warningButtonElement = document.querySelector(".warning__button"), warningButtonElement.addEventListener("click", function() {
                return warningElement.parentNode.removeChild(warningElement), ContentEdit.removeCSSClass(document.body, "ct--no-scroll")
            })
        }), window.addEventListener("touchstart", showTouchWarning)
    })
}).call(this);