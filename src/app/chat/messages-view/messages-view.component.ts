import { ApiService } from './../../services/api.service';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { timer } from 'rxjs';

@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.scss']
})
export class MessagesViewComponent implements OnChanges {
  @Input() messages: CometChat.TextMessage[] | null;
  @Input() selectedUserName: string;

  @Output() sendMessage = new EventEmitter<string>();

  @ViewChild('scrollMe', { static: false })
  messagesContainer: ElementRef<HTMLDivElement>;

  constructor(readonly authService: ApiService) {}

  onSendMessage(message: string) {
    this.sendMessage.emit(message);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.messages) {
      timer(10).subscribe(() => this.scrollIntoView());
    }
  }

  private scrollIntoView() {
    if (this.messagesContainer) {
      const { nativeElement } = this.messagesContainer;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }
  }
}
