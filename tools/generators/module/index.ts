import * as path                                                 from 'path';
import { folderExists }                                          from '../utils';
import { addModuleToRoutes, addModuleToState, addModuleToStore, addModuleToRoutesAframe} from '../ast';

export = {
  description: 'Add a module with VueX store and routes',
  prompts:     [
    {
      type:     'input',
      name:     'name',
      message:  'What should it be called?',
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return 'name is required';
        }

        return folderExists(value) ? `folder already exists (${value})` : true;
      },
    },
    {
      type:    'confirm',
      name:    'wantRoutes',
      default: true,
      message: 'Do you want routes?',
    },
    {
      type:    'confirm',
      name:    'wantVuex',
      default: true,
      message: 'Do you want vuex?',
    },
  ],
  actions:     (data: any) => {
    const pathArray: string[] = data.name.split('/');

    // add pathName
    if (pathArray && pathArray.length > 1) {
      data.pathName = pathArray[0] + '/';
    } else {
      data.pathName = '';
    }
    data.moduleName = pathArray.pop();
    data.componentName = data.moduleName;
    data.basePath = '../../src/app/' + pathArray.join('/');
    if (data.pathName) {
      data.relativePath = '../';
    } else {
      data.relativePath = '';
    }
    // relative

    let pathProxy = '';
    if (data.pathName) {
      pathProxy = '{{basePath}}/{{camelCase moduleName}}';
    } else {
      pathProxy = '{{basePath}}/{{pathName}}{{camelCase moduleName}}';
    }

    let actions: any[] = [
      {
        type:         'add',
        path:         pathProxy + '/{{properCase componentName}}/{{properCase componentName}}.vue',
        templateFile: './connected/connected.vue.hbs',
        abortOnFail:  true,
      },
      {
        type:         'add',
        path:         pathProxy + '/{{properCase componentName}}/{{properCase componentName}}.spec.ts',
        templateFile: './connected/connected.spec.ts.hbs',
        abortOnFail:  true,
      },
    ];

    if (data.wantRoutes) {
      if (data.pathName !== '') {
        addModuleToRoutesAframe(path.join(path.resolve(process.cwd()), 'src', 'app', 'aframe', 'routes.ts'), data.moduleName, data.pathName);
      } else {
        actions.push(
          {
            type:         'add',
            path:         pathProxy + '/routes.ts',
            templateFile: './module/routes.ts.hbs',
            abortOnFail:  true,
          });

        addModuleToRoutes(path.join(path.resolve(process.cwd()), 'src', 'app', 'router.ts'), data.moduleName);
      }
    }

    if (data.wantVuex) {
      actions = actions
      .concat([
                {
                  type:         'add',
                  path:         pathProxy + '/actions.spec.ts',
                  templateFile: './module/actions.spec.ts.hbs',
                  abortOnFail:  true,
                },
                {
                  type:         'add',
                  path:         pathProxy + '/actions.ts',
                  templateFile: './module/actions.ts.hbs',
                  abortOnFail:  true,
                },
                {
                  type:         'add',
                  path:         pathProxy + '/getters.spec.ts',
                  templateFile: './module/getters.spec.ts.hbs',
                  abortOnFail:  true,
                },
                {
                  type:         'add',
                  path:         pathProxy + '/getters.ts',
                  templateFile: './module/getters.ts.hbs',
                  abortOnFail:  true,
                },
                {
                  type:         'add',
                  path:         pathProxy + '/module.ts',
                  templateFile: './module/module.ts.hbs',
                  abortOnFail:  true,
                },
                {
                  type:         'add',
                  path:         pathProxy + '/mutations.spec.ts',
                  templateFile: './module/mutations.spec.ts.hbs',
                  abortOnFail:  true,
                },
                {
                  type:         'add',
                  path:         pathProxy + '/mutations.ts',
                  templateFile: './module/mutations.ts.hbs',
                  abortOnFail:  true,
                },
                {
                  type:         'add',
                  path:         pathProxy + '/state.ts',
                  templateFile: './module/state.ts.hbs',
                  abortOnFail:  true,
                },
              ]);

      addModuleToStore(path.join(path.resolve(process.cwd()), 'src', 'app', 'store.ts'), data.moduleName, data.pathName);
      addModuleToState(path.join(path.resolve(process.cwd()), 'src', 'app', 'state.ts'), data.moduleName, data.pathName);
    }

    return actions;
  },
};
