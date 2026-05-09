export interface Channel {
  id: string;
  name: string;
  url: string;
  isIframe?: boolean;
  category?: string;
  logo?: string;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export interface ChannelItemProps {
  channel: Channel;
  isActive: boolean;
  onClick: (channel: Channel) => void;
}