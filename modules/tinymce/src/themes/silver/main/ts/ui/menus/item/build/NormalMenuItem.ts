/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import { AlloyComponent, Disabling, ItemTypes } from '@ephox/alloy';
import { Menu } from '@ephox/bridge';
import { Option } from '@ephox/katamari';
import { UiFactoryBackstageProviders } from 'tinymce/themes/silver/backstage/Backstage';
import ItemResponse from '../ItemResponse';
import { renderItemStructure } from '../structure/ItemStructure';
import { buildData, renderCommonItem } from './CommonMenuItem';

// Note, this does not create a valid SketchSpec.
const renderNormalItem = (spec: Menu.MenuItem, itemResponse: ItemResponse, providersBackstage: UiFactoryBackstageProviders, renderIcons: boolean = true, isHorizontalMenu: boolean): ItemTypes.ItemSpec => {
  const getApi = (component: AlloyComponent): Menu.MenuItemInstanceApi => {
    return {
      isDisabled: () => Disabling.isDisabled(component),
      setDisabled: (state: boolean) => Disabling.set(component, state)
    };
  };

  // If we're making a horizontal menu (mobile context menu) we want text OR icons
  // to simplify the UI. We also don't want shortcut text.
  const structure = renderItemStructure({
    presets: 'normal',
    iconContent: isHorizontalMenu && spec.text.isSome() ? Option.none() : spec.icon,
    textContent: spec.text,
    htmlContent: Option.none(),
    ariaLabel: spec.text,
    caret: Option.none(),
    checkMark: Option.none(),
    shortcutContent: isHorizontalMenu ? Option.none() : spec.shortcut
  }, providersBackstage, renderIcons);

  return renderCommonItem({
    data: buildData(spec),
    getApi,
    disabled: spec.disabled,
    onAction: spec.onAction,
    onSetup: spec.onSetup,
    triggersSubmenu: false,
    itemBehaviours: [ ]
  }, structure, itemResponse);
};

export { renderNormalItem };

