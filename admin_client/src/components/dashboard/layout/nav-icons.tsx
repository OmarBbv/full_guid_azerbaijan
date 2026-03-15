import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { BuildingsIcon } from '@phosphor-icons/react/dist/ssr/Buildings';
import { BedIcon } from '@phosphor-icons/react/dist/ssr/Bed';
import { MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin';
import { ForkKnifeIcon } from '@phosphor-icons/react/dist/ssr/ForkKnife';
import { NotebookIcon } from '@phosphor-icons/react/dist/ssr/Notebook';
import { MegaphoneSimpleIcon } from '@phosphor-icons/react/dist/ssr/MegaphoneSimple';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { CityIcon } from '@phosphor-icons/react/dist/ssr/City';
import { InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { BookOpenIcon } from '@phosphor-icons/react/dist/ssr/BookOpen';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  user: UserIcon,
  users: UsersIcon,
  buildings: BuildingsIcon,
  bed: BedIcon,
  'map-pin': MapPinIcon,
  'fork-knife': ForkKnifeIcon,
  notebook: NotebookIcon,
  megaphone: MegaphoneSimpleIcon,
  list: ListIcon,
  city: CityIcon,
  info: InfoIcon,
  'book-open': BookOpenIcon,
} as Record<string, Icon>;
