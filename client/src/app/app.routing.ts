import { RouterModule, Routes } from '@angular/router';
import {RecordAudioComponent} from './record-audio/record-audio.component';
import {RecordVideoComponent} from './record-video/record-video.component';
import {ChatComponent} from "./socket/components/chat/chat.component";

const routes: Routes = [
  { path: '', component: RecordAudioComponent },
  { path: 'video', component: RecordVideoComponent},
  { path: 'chat', component: ChatComponent}
];

export const routing = RouterModule.forRoot(routes);
