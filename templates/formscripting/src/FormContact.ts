/// <reference path="../node_modules/@types/xrm/index.d.ts" />

module Forms {
    export class ContactForm {
        static onLoad(executionContext: Xrm.Page.EventContext) {
            Xrm.Navigation.openAlertDialog({ text: "load" }, null);
        }

        static onChangefirstname(executionContext: Xrm.Page.EventContext) {
            Xrm.Navigation.openAlertDialog({ text: "onchange first name" },null)};
        }
}