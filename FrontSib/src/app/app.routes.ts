import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { ReminPage } from './pages/remin-page/remin-page';
import { EditPage } from './pages/edit-page/edit-page';
import { Forma } from './common/forma/forma';



export const routes: Routes = [
    {path: '', component: MainPage},
    {path: 'reminder', component: ReminPage},
    {path: 'edit/:id', component: EditPage}
];
