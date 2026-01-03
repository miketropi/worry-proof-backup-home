import { MessageCircle, Shield, Zap, Clock, Users, DollarSign, TrendingUp, Heart, AlertTriangle, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function ClientWorry() {
  const clientsWorry = [
    {
      "id": 1,
      "worry": "I lost everything after the server crashed. It's all gone.",
      "response": "No worries! With an automatic backup system, you can restore your entire website with just one click. Nothing's ever really lost if you've got backups 😉",
      "icon": AlertTriangle,
      "color": "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
      "size": "large",
      "priority": "high"
    },
    {
      "id": 2,
      "worry": "My site got hacked — all the files are gone or encrypted.",
      "response": "Hackers may cause trouble, but they can't touch your magical backup copy! Restore everything like nothing ever happened 💾✨",
      "icon": Shield,
      "color": "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
      "size": "medium",
      "priority": "high"
    },
    {
      "id": 3,
      "worry": "I updated a plugin and now it's just a blank white screen.",
      "response": "Plugin errors? No biggie! Backups let you rewind time and get back to a stable version in seconds ⏱🧙‍♂️",
      "icon": Clock,
      "color": "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
      "size": "small",
      "priority": "medium"
    },
    {
      "id": 4,
      "worry": "My staff accidentally deleted the entire media library. It's a disaster.",
      "response": "Mistakes happen — but with a backup, even a major oops becomes a minor hiccup 🐰. Everything's recoverable!",
      "icon": Users,
      "color": "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
      "size": "medium",
      "priority": "medium"
    },
    {
      "id": 5,
      "worry": "I installed a new plugin and now my site layout is broken.",
      "response": "Test freely, fearlessly! With backups, you can experiment all you want, knowing you always have a safety net 🛡️💡",
      "icon": Zap,
      "color": "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
      "size": "large",
      "priority": "medium"
    },
    {
      "id": 6,
      "worry": "I lost access to my hosting account, and now my data is gone.",
      "response": "When your backup is stored offsite, you've got your own master key. Even if one door closes, you've still got a safe backdoor 🔐📦",
      "icon": Shield,
      "color": "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
      "size": "small",
      "priority": "high"
    },
    // {
    //   "id": 7,
    //   "worry": "The site crashed during a sales peak, and we couldn't fix it in time.",
    //   "response": "With backup in place, you get super-fast recovery powers. Bring your site back up in minutes — even in the heat of battle 🧯🚀",
    //   "icon": Zap,
    //   "color": "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
    //   "size": "medium",
    //   "priority": "high"
    // },
    // {
    //   "id": 8,
    //   "worry": "My SEO tanked after 3 days of downtime.",
    //   "response": "Don't let Google frown on you! Backups help you minimize downtime, keeping your SEO rankings green and growing 🌿📈",
    //   "icon": TrendingUp,
    //   "color": "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
    //   "size": "large",
    //   "priority": "medium"
    // },
    // {
    //   "id": 9, 
    //   "worry": "Customers kept messaging me because the site was down.",
    //   "response": "A stable site builds trust. Backups are your secret weapon to stay consistent and professional, no matter what 🍀💼",
    //   "icon": Heart, 
    //   "color": "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200",
    //   "size": "small",
    //   "priority": "medium"
    // },
    // {
    //   "id": 10,
    //   "worry": "Now I have to pay someone to rebuild everything. It's expensive and stressful.",
    //   "response": "Instead of rising from the ashes, why not just restore from backup? Save time, save money, and save your peace of mind 💡💸",
    //   "icon": DollarSign,
    //   "color": "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200",
    //   "size": "medium",
    //   "priority": "high"
    // }
  ];

  const getCardSize = (size) => {
    switch (size) {
      case 'large':
        return 'col-span-1 lg:col-span-2';
      case 'medium':
        return 'col-span-1';
      case 'small':
        return 'col-span-1 lg:col-span-1';
      default:
        return 'col-span-1';
    }
  };

  const getCardHeight = (size) => {
    switch (size) {
      case 'large':
        return 'min-h-[280px]';
      case 'medium':
        return 'min-h-[240px]';
      case 'small':
        return 'min-h-[200px]';
      default:
        return 'min-h-[240px]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-blue-600 font-medium text-sm">WordPress Backup Solutions</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Common WordPress Worries
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Real concerns from website owners, and how backup solutions provide peace of mind
        </p>
      </div>

      {/* Creative Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 font-google-sans-code">
        {clientsWorry.map((item, index) => {
          const IconComponent = item.icon;
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={item.id} 
              className={`${getCardSize(item.size)} ${getCardHeight(item.size)} transform transition-all duration-300 hover:scale-105 hover:rotate-1`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={`h-full bg-white border-2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group ${isEven ? 'rotate-1' : '-rotate-1'}`}>
                {/* Decorative Elements */}
                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                  <IconComponent className="w-8 h-8 text-gray-400" />
                </div>
                
                {/* Worry Section */}
                <div className="p-4 border-b border-gray-100 relative">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                      <MessageCircle className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Client Worry</h3>
                      <p className="text-xs text-gray-500">WordPress Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed font-medium">
                    {item.worry}
                  </p>
                </div>

                {/* Solution Section */}
                <div className={`p-4 h-full flex flex-col justify-between ${item.color} relative`}>
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <IconComponent className="w-3 h-3 text-gray-600" />
                        <span className="font-bold text-gray-900 text-sm">Backup Solution</span>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {item.response}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-3 pt-2 border-t border-white/20">
                    <button className="w-full bg-white/80 hover:bg-white text-gray-800 font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 group/btn text-xs">
                      <span>Learn More</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Priority Badge */}
                {item.priority === 'high' && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    HIGH
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-6 left-6 w-12 h-12 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-10 h-10 bg-indigo-400 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-400 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-md">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-bold text-sm">Ready to Transform Your WordPress Experience?</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Ready to Worry Less?
            </h3>
            <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
              Don't let these scenarios become your reality. Get started with worry-proof backups today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2 text-sm">
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white/80 hover:bg-white text-gray-800 font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border-2 border-gray-200 text-sm">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}