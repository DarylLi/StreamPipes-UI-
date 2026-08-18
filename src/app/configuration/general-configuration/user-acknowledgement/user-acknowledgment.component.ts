/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'sp-user-acknowledgment',
    templateUrl: './user-acknowledgment.component.html',
    standalone: false,
})
export class UserAcknowledgmentComponent {
    @Input()
    parentForm: FormGroup;

    quillConfig: any = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: 1 }, { header: 2 }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
        ],
    };

    onEditorCreated(editor: any): void {
        // Quill 2.x 的图标按钮没有自带 title，补上中文提示。
        const tooltips: Record<string, string> = {
            'ql-bold': '加粗',
            'ql-italic': '斜体',
            'ql-underline': '下划线',
            'ql-strike': '删除线',
            'ql-color': '文字颜色',
            'ql-background': '背景颜色',
        };
        const toolbar = editor?.getModule('toolbar')?.container as
            | HTMLElement
            | undefined;
        toolbar?.querySelectorAll('button, .ql-picker').forEach(element => {
            for (const [className, label] of Object.entries(tooltips)) {
                if (element.classList.contains(className)) {
                    element.setAttribute('title', label);
                    break;
                }
            }
        });
    }
}
