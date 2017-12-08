/// <reference path="../node_modules/@types/xrm/index.d.ts" />

module Forms {
    export class SharedForm {
       
        static ExampleSharedFunction() {
            Xrm.Navigation.openAlertDialog({ text: "Shared Function" },null)};
        }
}