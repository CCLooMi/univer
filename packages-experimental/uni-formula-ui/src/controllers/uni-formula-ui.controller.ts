/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Disposable, ICommandService, Inject, LifecycleStages, OnLifecycle } from '@univerjs/core';
import { ComponentManager } from '@univerjs/ui';
import { UniFormulaPopup } from '../views/components/DocFormulaPopup';
import { CloseFormulaPopupOperation, ConfirmFormulaPopupCommand, ShowFormulaPopupOperation } from '../commands/operations/operation';

@OnLifecycle(LifecycleStages.Steady, UniFormulaUniController)
export class UniFormulaUniController extends Disposable {
    constructor(
        @ICommandService private readonly _commandSrv: ICommandService,
        @Inject(ComponentManager) private readonly _componentManager: ComponentManager
    ) {
        super();

        [
            ShowFormulaPopupOperation,
            CloseFormulaPopupOperation,
            ConfirmFormulaPopupCommand,
        ].forEach((command) => this._commandSrv.registerCommand(command));

        this.disposeWithMe(this._componentManager.register(UniFormulaPopup.componentKey, UniFormulaPopup));
    }
}
