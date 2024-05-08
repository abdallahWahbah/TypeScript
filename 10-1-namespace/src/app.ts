/// <reference path="./models/drag-drop.ts" />
/// <reference path="./models/project.ts" />
/// <reference path="./state/project-state.ts" />
/// <reference path="./util/validation.ts" />
/// <reference path="./decorators/autobind.ts" />
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />

// don't forget to uncomment the "outFile" property in the tsconfig.json file to execute all namespaces in one file and import the script in html file

namespace App
{
    new ProjectInput();
    new ProjectList("active");
    new ProjectList("finished");
}
