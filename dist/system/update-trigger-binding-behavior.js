'use strict';

System.register(['aurelia-binding'], function (_export, _context) {
  "use strict";

  var bindingMode, EventManager, _class, _temp, eventNamesRequired, notApplicableMessage, UpdateTriggerBindingBehavior;

  

  return {
    setters: [function (_aureliaBinding) {
      bindingMode = _aureliaBinding.bindingMode;
      EventManager = _aureliaBinding.EventManager;
    }],
    execute: function () {
      eventNamesRequired = 'The updateTrigger binding behavior requires at least one event name argument: eg <input value.bind="firstName & updateTrigger:\'blur\'">';
      notApplicableMessage = 'The updateTrigger binding behavior can only be applied to two-way bindings on input/select elements.';

      _export('UpdateTriggerBindingBehavior', UpdateTriggerBindingBehavior = (_temp = _class = function () {
        function UpdateTriggerBindingBehavior(eventManager) {
          

          this.eventManager = eventManager;
        }

        UpdateTriggerBindingBehavior.prototype.bind = function bind(binding, source) {
          for (var _len = arguments.length, events = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            events[_key - 2] = arguments[_key];
          }

          if (events.length === 0) {
            throw new Error(eventNamesRequired);
          }
          if (binding.mode !== bindingMode.twoWay) {
            throw new Error(notApplicableMessage);
          }

          var targetObserver = binding.observerLocator.getObserver(binding.target, binding.targetProperty);
          if (!targetObserver.handler) {
            throw new Error(notApplicableMessage);
          }
          binding.targetObserver = targetObserver;

          targetObserver.originalHandler = binding.targetObserver.handler;

          var handler = this.eventManager.createElementHandler(events);
          targetObserver.handler = handler;
        };

        UpdateTriggerBindingBehavior.prototype.unbind = function unbind(binding, source) {
          binding.targetObserver.handler = binding.targetObserver.originalHandler;
          binding.targetObserver.originalHandler = null;
        };

        return UpdateTriggerBindingBehavior;
      }(), _class.inject = [EventManager], _temp));

      _export('UpdateTriggerBindingBehavior', UpdateTriggerBindingBehavior);
    }
  };
});