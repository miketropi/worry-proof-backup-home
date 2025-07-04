import {
  MousePointerClick,
  Database,
  Puzzle,
  Folder,
  FlaskConical,
  MonitorSmartphone,
  ShieldCheck,
  CalendarClock,
  Mail,
  BarChart2
} from 'lucide-react';

const features = [
  {
    id: 'fe42c1a9',
    title: 'One-Click Backup & Restore',
    description: 'One click and your site is backed up! No more stress about losing your hard work. It\'s like having a time machine for your website! 🚀',
    icon: MousePointerClick,
  },
  {
    id: 'a7db390f',
    title: 'Database Import/Export',
    description: 'Move your data around like a boss! Export, import, or backup your WordPress database super fast. No more waiting around forever! ⚡',
    icon: Database,
  },
  {
    id: '3cfa7e2b',
    title: 'Plugin & Theme Backup',
    description: 'Keep all your cool plugins and themes safe! Backup everything and restore them whenever you want. No more broken sites! 🛡️',
    icon: Puzzle,
  },
  {
    id: 'edb20935',
    title: 'Uploads & Folder Backup',
    description: 'Never lose your files again! All your uploads and important folders are backed up automatically. Your content stays safe and sound! 💾',
    icon: Folder,
  },
  {
    id: '9f81b6c2',
    title: 'Demo Content Import (coming soon)',
    description: 'Coming soon! One-click demo content that actually works. Perfect for developers who want to test stuff without the hassle! 🔥',
    icon: FlaskConical,
  },
  {
    id: '5a2ecb98',
    title: 'Modern Admin UI',
    description: 'Super clean and modern dashboard built with React! Looks amazing and works like a dream. No more ugly old-school interfaces! ✨',
    icon: MonitorSmartphone,
  },
  {
    id: 'c6d1370e',
    title: 'AJAX & Nonce Security',
    description: 'Everything is super secure! WordPress nonces + AJAX keep your site safe while making everything smooth and fast. No hackers allowed! 🛡️',
    icon: ShieldCheck,
  },
  {
    id: 'b98044c3',
    title: 'Automated Backup Scheduling',
    description: 'Set it up once and forget about it! Daily, weekly, or monthly backups happen automatically. Your future self will thank you! 🤖',
    icon: CalendarClock,
  },
  {
    id: 'd2a9f34e',
    title: 'Email Notifications',
    description: 'Get an email every time your backup finishes! No more wondering if it worked. Stay in the loop without lifting a finger! 📬',
    icon: Mail,
  },
  {
    id: '81fc7d2a',
    title: 'Backup Status Tracking',
    description: 'See exactly what\'s happening with your backups! Track progress, check history, and know everything is working perfectly! 📈',
    icon: BarChart2,
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Features</h2>
      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        Complete WordPress backup solution with database and file protection. 
        Automated backups, secure storage, and one-click restoration.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md border border-gray-100">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
              <th width="30%" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Feature</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody>
            {features.map(({ id, title, description, icon: Icon }, idx) => (
              <tr key={id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-4 align-middle">
                  <span className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-2">
                    <Icon size={24} />
                  </span>
                </td>
                <td className="px-4 py-4 align-middle font-bold text-gray-900">{title}</td>
                <td className="px-4 py-4 align-middle text-gray-600 text-sm">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}