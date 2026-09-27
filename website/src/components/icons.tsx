import AirplaneModeIcon from '@hugeicons/core-free-icons/AirplaneModeIcon';
import AppleIcon from '@hugeicons/core-free-icons/AppleIcon';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import CloudOffIcon from '@hugeicons/core-free-icons/CloudOffIcon';
import ComputerIcon from '@hugeicons/core-free-icons/ComputerIcon';
import DashboardSquare01Icon from '@hugeicons/core-free-icons/DashboardSquare01Icon';
import DatabaseBackupIcon from '@hugeicons/core-free-icons/DatabaseBackupIcon';
import Download04Icon from '@hugeicons/core-free-icons/Download04Icon';
import FaceIdIcon from '@hugeicons/core-free-icons/FaceIdIcon';
import FingerPrintIcon from '@hugeicons/core-free-icons/FingerPrintIcon';
import HardDriveIcon from '@hugeicons/core-free-icons/HardDriveIcon';
import Invoice03Icon from '@hugeicons/core-free-icons/Invoice03Icon';
import Key01Icon from '@hugeicons/core-free-icons/Key01Icon';
import Leaf01Icon from '@hugeicons/core-free-icons/Leaf01Icon';
import Menu01Icon from '@hugeicons/core-free-icons/Menu01Icon';
import Moon02Icon from '@hugeicons/core-free-icons/Moon02Icon';
import Notification03Icon from '@hugeicons/core-free-icons/Notification03Icon';
import PieChartIcon from '@hugeicons/core-free-icons/PieChartIcon';
import PiggyBankIcon from '@hugeicons/core-free-icons/PiggyBankIcon';
import PlayStoreIcon from '@hugeicons/core-free-icons/PlayStoreIcon';
import QrCodeIcon from '@hugeicons/core-free-icons/QrCodeIcon';
import SecurityCheckIcon from '@hugeicons/core-free-icons/SecurityCheckIcon';
import ServerOffIcon from '@hugeicons/core-free-icons/ServerOffIcon';
import SmartPhone01Icon from '@hugeicons/core-free-icons/SmartPhone01Icon';
import SquareLock02Icon from '@hugeicons/core-free-icons/SquareLock02Icon';
import Sun03Icon from '@hugeicons/core-free-icons/Sun03Icon';
import Tag01Icon from '@hugeicons/core-free-icons/Tag01Icon';
import Target01Icon from '@hugeicons/core-free-icons/Target01Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import UserIcon from '@hugeicons/core-free-icons/UserIcon';
import Wallet01Icon from '@hugeicons/core-free-icons/Wallet01Icon';
import WifiOff01Icon from '@hugeicons/core-free-icons/WifiOff01Icon';
import { HugeiconsIcon, type HugeiconsProps, type IconSvgElement } from '@hugeicons/react';

/**
 * Every icon on the site, from Hugeicons (free set, stroke-rounded) — the same
 * library and, where screens overlap, the same icons as the mobile app.
 * Icons are decorative by default (`aria-hidden`); pass a label where one is meaningful.
 */
type IconProps = Omit<HugeiconsProps, 'icon'>;

const make = (icon: IconSvgElement, displayName: string) => {
  const Component = (props: IconProps) => <HugeiconsIcon icon={icon} strokeWidth={1.5} aria-hidden="true" {...props} />;
  Component.displayName = displayName;
  return Component;
};

/** Keypad backspace (⌫) — not in the free set, so drawn in its style. Same glyph as the app. */
const KeypadBackspaceIcon: IconSvgElement = [
  ['path', { d: 'M9.1 5.5H18.5C19.6 5.5 20.5 6.4 20.5 7.5V16.5C20.5 17.6 19.6 18.5 18.5 18.5H9.1C8.5 18.5 8 18.2 7.6 17.8L3.8 13.3C3.2 12.5 3.2 11.5 3.8 10.7L7.6 6.2C8 5.8 8.5 5.5 9.1 5.5Z', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.5', key: '0' }],
  ['path', { d: 'M11.5 9.5L16.5 14.5M16.5 9.5L11.5 14.5', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.5', key: '1' }],
];

// Brand & store
export const Leaf = make(Leaf01Icon, 'Leaf');
export const AppleLogo = make(AppleIcon, 'AppleLogo');
export const PlayStoreLogo = make(PlayStoreIcon, 'PlayStoreLogo');

// Navigation & UI
export const Menu = make(Menu01Icon, 'Menu');
export const Close = make(Cancel01Icon, 'Close');
export const ChevronDown = make(ArrowDown01Icon, 'ChevronDown');
export const Check = make(Tick02Icon, 'Check');
export const Download = make(Download04Icon, 'Download');
export const QrCode = make(QrCodeIcon, 'QrCode');
export const Smartphone = make(SmartPhone01Icon, 'Smartphone');
export const ThemeSystem = make(ComputerIcon, 'ThemeSystem');
export const ThemeLight = make(Sun03Icon, 'ThemeLight');
export const ThemeDark = make(Moon02Icon, 'ThemeDark');

// Features & privacy
export const WifiOff = make(WifiOff01Icon, 'WifiOff');
export const CloudOff = make(CloudOffIcon, 'CloudOff');
export const ShieldCheck = make(SecurityCheckIcon, 'ShieldCheck');
export const Fingerprint = make(FingerPrintIcon, 'Fingerprint');
export const FaceId = make(FaceIdIcon, 'FaceId');
export const Bell = make(Notification03Icon, 'Bell');
export const PiggyBank = make(PiggyBankIcon, 'PiggyBank');
export const PieChart = make(PieChartIcon, 'PieChart');
export const Wallet = make(Wallet01Icon, 'Wallet');
export const Tag = make(Tag01Icon, 'Tag');
export const DatabaseBackup = make(DatabaseBackupIcon, 'DatabaseBackup');
export const HardDrive = make(HardDriveIcon, 'HardDrive');
export const Key = make(Key01Icon, 'Key');
export const Lock = make(SquareLock02Icon, 'Lock');
export const ServerOff = make(ServerOffIcon, 'ServerOff');
export const Airplane = make(AirplaneModeIcon, 'Airplane');
export const User = make(UserIcon, 'User');

// App tab bar & keypad (mirrors the mobile app)
export const TabHome = make(DashboardSquare01Icon, 'TabHome');
export const TabTransactions = make(Invoice03Icon, 'TabTransactions');
export const TabGoals = make(Target01Icon, 'TabGoals');
export const Backspace = make(KeypadBackspaceIcon, 'Backspace');
