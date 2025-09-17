import React, { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  Wifi, 
  Smartphone, 
  Monitor, 
  Volume2, 
  Eye, 
  Lock, 
  Key, 
  Download, 
  Upload, 
  Trash2, 
  RefreshCw, 
  Save, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  HelpCircle, 
  ExternalLink, 
  Moon, 
  Sun, 
  Laptop, 
  Zap, 
  Clock, 
  Calendar, 
  Mail, 
  MessageSquare, 
  Phone, 
  Camera, 
  Mic, 
  Speaker, 
  Headphones, 
  Bluetooth, 
  Cloud, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Battery, 
  Signal, 
  MapPin, 
  Globe as Languages, 
  Accessibility, 
  Printer, 
  Usb, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  Search, 
  Filter, 
  SortAsc, 
  Grid, 
  List, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Activity, 
  Bookmark, 
  Star, 
  Heart, 
  Flag, 
  Tag, 
  Folder, 
  FolderOpen, 
  Plus, 
  Minus, 
  Edit, 
  Copy, 
  Share, 
  Link, 
  QrCode,
  Code,
  Scan, 
  Fingerprint, 
  ShieldCheck, 
  UserCheck, 
  Users, 
  UserPlus, 
  UserMinus, 
  Crown, 
  Award, 
  Medal, 
  Trophy, 
  Target, 
  Crosshair, 
  Focus, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  Move, 
  MousePointer, 
  Hand, 
  Grab, 
  ZoomIn, 
  ZoomOut, 
  Expand, 
  Shrink, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsUp, 
  ChevronsDown, 
  ChevronsLeft, 
  ChevronsRight, 
  MoreHorizontal, 
  MoreVertical, 
  Menu, 
  X as CloseIcon, 
  Home, 
  Building, 
  School, 
  Hospital, 
  Store, 
  Factory, 
  Warehouse, 
  Car, 
  Truck, 
  Plane, 
  Ship, 
  Train, 
  Bus, 
  Bike, 
  MapPinned, 
  Navigation, 
  Compass, 
  Map, 
  Route, 
  Milestone, 
  Signpost, 
  Mountain, 
  Waves, 
  Sun as SunIcon, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Wind, 
  Thermometer, 
  Droplets, 
  Umbrella, 
  Snowflake, 
  Flame, 
  Zap as Lightning, 
  Flashlight, 
  Lightbulb, 
  Lamp, 
  LampDesk, 
  LampFloor, 
  LampWallDown, 
  LampWallUp, 
  Blinds, 
  Bed, 
  BedDouble, 
  BedSingle, 
  Sofa, 
  Armchair, 
  Table, 
  Table2, 
  Utensils, 
  UtensilsCrossed, 
  ChefHat, 
  Coffee, 
  Wine, 
  Beer, 
  Martini, 
  IceCream, 
  Cake, 
  Cookie, 
  Pizza, 
  Sandwich, 
  Salad, 
  Apple, 
  Banana, 
  Cherry, 
  Grape, 
  Carrot, 
  Wheat, 
  Leaf, 
  Flower, 
  Flower2, 
  Sprout, 
  Trees, 
  TreeDeciduous, 
  Palmtree, 
  Bug, 
  Bird, 
  Fish, 
  Rabbit, 
  Squirrel, 
  Cat, 
  Dog, 
  Turtle, 
  Shrimp, 
  Feather, 
  Egg, 
  Footprints, 
  PawPrint, 
  Bone, 
  Dna, 
  Microscope, 
  TestTube, 
  TestTube2, 
  TestTubes, 
  Beaker, 
  FlaskConical, 
  FlaskRound, 
  Pipette, 
  Syringe, 
  Pill, 
  Tablets, 
  Bandage, 
  Stethoscope, 
  Thermometer as ThermometerIcon, 
  HeartPulse, 
  Brain, 
  Bone as BoneIcon, 
  Skull, 
  Baby, 
  PersonStanding, 
  Accessibility as AccessibilityIcon, 
  Glasses, 
  Contact, 
  EarOff, 
  Ear, 
  Scissors, 
  Brush, 
  Toilet, 
  Droplet, 
  Washing, 
  Shirt, 
  Crown as CrownIcon, 
  Backpack, 
  Briefcase, 
  Wallet, 
  CreditCard as CreditCardIcon, 
  Banknote, 
  Coins, 
  PiggyBank, 
  Safe, 
  Vault, 
  ATM, 
  Receipt, 
  Calculator, 
  Abacus, 
  Scale, 
  Ruler, 
  Compass as CompassIcon, 
  Triangle, 
  Circle, 
  Pentagon, 
  Hexagon, 
  Octagon, 
  Diamond, 
  Heart as HeartIcon, 
  Spade, 
  Club, 
  Clubs, 
  Spades, 
  Hearts, 
  Diamonds, 
  Target as TargetIcon, 
  Crosshair as CrosshairIcon, 
  Scissors as ScissorsIcon, 
  Star as StarIcon, 
  Telescope, 
  Satellite, 
  Rocket, 
  Telescope as TelescopeIcon, 

  Triangle as TriangleIcon, 
 
  Keyboard, 

  Subwoofer, 
  Tweeter, 
  Woofer, 
  Crossover, 
  Equalizer, 
  Compressor, 
  Limiter, 
  Gate, 
  Reverb, 
  Delay, 
  Chorus, 
  Flanger, 
  Phaser, 
  Distortion, 
  Overdrive, 
  Fuzz, 
  Wah, 
  Filter as FilterIcon, 
  Envelope, 
  LFO, 
  Oscillator, 
  VCA, 
  VCF, 
  VCO, 
  ADSR, 
  Patch, 
  Cable, 
  Jack, 
  XLR, 
  RCA, 
  TRS, 
  TS, 
  MIDI, 
   
  SVideo, 
  Coaxial, 
  Optical, 
  Ethernet, 
  WiFi as WiFiIcon, 
  Bluetooth as BluetoothIcon, 
  NFC, 
  RFID, 
  QR, 
  Barcode, 
  Fingerprint as FingerprintIcon, 
  FaceID, 
  TouchID, 
  Retina, 
  Iris, 
  Voice, 
  Gesture, 
  Motion, 
  Proximity, 
  Ambient, 
  Temperature, 
  Humidity, 
  Pressure, 
  Light, 
  Sound, 
  Vibration, 
  Magnetic, 
  Gyroscope, 
  Accelerometer, 
  Compass as CompassIcon2, 
  GPS, 
  Altimeter, 
  Barometer, 
  Hygrometer, 
  Anemometer, 
  Seismometer, 
  Geiger, 
  Dosimeter, 
  Spectrometer, 
  Oscilloscope, 
  Multimeter, 
  Voltmeter, 
  Ammeter, 
  Ohmmeter, 
  Wattmeter, 
  Frequency, 
  Signal as SignalIcon2, 
  Noise, 
  Interference, 
  Distortion as DistortionIcon, 
  Harmonic, 
  Fundamental, 
  Overtone, 
  Resonance, 
  Damping, 
  Absorption, 
  Reflection, 
  Refraction, 
  Diffraction, 
  Interference as InterferenceIcon, 
  Polarization, 
  Wavelength, 
  Frequency as FrequencyIcon, 
  Amplitude, 
  Phase, 
  Period, 
  Cycle, 
  Hertz, 
  Decibel, 
  Octave, 
  Semitone, 
 
 
  Ritardando, 
  Accelerando, 
  Crescendo, 
  Diminuendo, 
  Forte, 
  Piano as PianoIcon, 
  Mezzo, 
  Fortissimo, 
  Pianissimo, 
  Sforzando, 
  Accent, 
  Staccato, 
  Legato, 
  Tenuto, 
  Marcato, 
  Fermata, 
  Trill, 
  Mordent, 
  Turn, 
  Appoggiatura, 
  Acciaccatura, 
  Glissando, 
  Portamento, 
  Vibrato, 
  Tremolo, 
  Pizzicato, 
  Arco, 
  ConSordino, 
  SenzaSordino, 
   
   
  Swing, 
  Groove, 
  Pocket, 
  Feel, 
  Shuffle as ShuffleIcon, 
  Straight, 
  Laid, 
  Rushed, 
  Relaxed, 
  Tight, 
  Loose, 
  Heavy, 
  Thick, 
  Thin, 
  Warm, 
  Cool, 
  Bright, 
  Dark, 
  Clean, 
  Dirty, 
  Smooth, 
  Rough, 
  Soft, 
  Hard, 
  Wet, 
  Dry, 
  Wide, 
  Narrow, 
  Deep, 
  Shallow, 
  High, 
  Low, 
  Fast, 
  Slow, 
  Quick, 
  Sluggish, 
  Sharp as SharpIcon, 
  Dull, 
  Crisp, 
  Muddy, 
  Clear, 
  Cloudy, 
  Transparent, 
  Opaque, 
  Translucent, 
  Matte, 
  Glossy, 
  Shiny, 
  Reflective, 
  Absorptive, 
  Emissive, 
  Fluorescent, 
  Phosphorescent, 
  Luminescent, 
  Incandescent, 
  LED, 
  OLED, 
  LCD, 
  CRT, 
  Plasma, 
  Projection, 
  Hologram, 
  VR, 
  AR, 
  MR, 
  XR, 
  AI, 
  ML, 
  DL, 
  NN, 
  CNN, 
  RNN, 
  LSTM, 
  GRU, 
  Transformer, 
  Attention, 
  Encoder, 
  Decoder, 
  Embedding, 
  Tokenization, 
  Preprocessing, 
  Postprocessing, 
  Training, 
  Validation, 
  Testing, 
  Inference, 
  Prediction, 
  Classification, 
  Regression, 
  Clustering, 
  Segmentation, 
  Detection, 
  Recognition, 
  Generation, 
  Synthesis, 
  Analysis, 
  Optimization, 
  Hyperparameter, 
  Loss, 
  Gradient, 
  Backpropagation, 
  Forward, 
  Backward, 
  Epoch, 
  Batch, 
  Sample, 
  Dataset, 
  Feature, 
  Label, 
  Output, 
  Hidden, 
  Layer, 
  Node, 
  Weight, 
  Bias, 
  Activation, 
  Sigmoid, 
  Tanh, 
  ReLU, 
  LeakyReLU, 
  ELU, 
  SELU, 
  Swish, 
  GELU, 
  Mish, 
  Softmax, 
  Softplus, 
  Softsign, 
  Linear, 
  Identity, 
  Step, 
  Sign, 
  Absolute, 
  Sqrt, 
  Log, 
  Exp, 
  Sin, 
  Cos, 
  Tan, 
  Sinh, 
  Cosh, 
  Tanh as TanhIcon, 
  Arcsin, 
  Arccos, 
  Arctan, 
  Arcsinh, 
  Arccosh, 
  Arctanh, 
  Degree, 
  Radian, 
  Pi, 
  E, 
  Infinity, 
  NaN, 
  Null, 
  Undefined, 
  True, 
  False, 
  Boolean, 
  Integer, 
  Float, 
  Double, 
  String, 
  Character, 
  Array, 
  Set, 
  Dictionary, 
  Hash, 
  Tree, 
  Graph, 
  Stack, 
  Heap, 
  Priority, 
  Sort, 
  Search as SearchIcon, 
  Binary, 
  Linear as LinearIcon, 
  Bubble, 
  Selection, 
  Insertion, 
  Merge, 
  Heap as HeapIcon, 
  Radix, 
  Counting, 
  Topological, 
  Breadth, 
  Depth, 
  Dijkstra, 
  Bellman, 
  Floyd, 
  Kruskal, 
  Prim, 
  Tarjan, 
  Kosaraju, 
  Union, 
  Find, 
  Disjoint, 
  Segment, 
  Fenwick, 
  Sparse, 
  Suffix, 
  Trie, 
  Automaton, 
  Regex, 
  Pattern, 
  Replace, 
  Split, 
  Join, 
  Concat, 
  Substring, 
  Index, 
  Length, 
  Size, 
  Count, 
  Sum, 
  Average, 
  Mean, 
  Median, 
  Mode, 
  Range, 
  Variance, 
  Deviation, 
  Standard, 
  Normal, 
  Uniform, 
  Exponential, 
  Poisson, 
  Binomial, 
  Geometric, 
  Hypergeometric, 
  Negative, 
  Beta, 
  Gamma, 
  Chi, 
  Student, 
  Fisher, 
  Weibull, 
  Pareto, 
  Lognormal, 
  Cauchy, 
  Laplace, 
  Logistic, 
  Gumbel, 
  Frechet, 
  Generalized, 
  Extreme, 
  Value, 
  Distribution, 
  Probability, 
  Density, 
  Function, 
  Cumulative, 
  Quantile, 
  Percentile, 
  Quartile, 
  Decile, 
  Confidence, 
  Interval, 
  Hypothesis, 
  Test, 
  Statistic, 
  Significance, 
  Level, 
  Power, 
  Effect, 
  Sample as SampleIcon, 
  Population, 
  Parameter, 
  Estimator, 
  Estimate, 
  Consistency, 
  Efficiency, 
  Sufficiency, 
  Completeness, 
  Minimal, 
  Maximum, 
  Likelihood, 
  Bayesian, 
  Frequentist, 
  Prior, 
  Posterior, 
  Evidence, 
  Marginal, 
  Conditional, 
  Independence, 
  Correlation, 
  Covariance, 
  Regression as RegressionIcon, 
  Residual, 
  Fitted, 
  Predicted, 
  Observed, 
  Expected, 
  Actual, 
  Squared, 
  Absolute as AbsoluteIcon, 
  Relative, 
  Percentage, 
  Ratio, 
  Proportion, 
  Rate, 
  Frequency as FrequencyIcon2, 
  Density as DensityIcon, 
  Intensity, 
  Magnitude, 
  Dimension, 
  Vector, 
  Matrix, 
  Tensor, 
  Scalar, 
  Dot, 
  Cross, 
  Product, 
  Transpose, 
  Inverse, 
  Determinant, 
  Eigenvalue, 
  Eigenvector, 
  Singular, 
  Decomposition, 
  Factorization, 
  LU, 
  SVD, 
  PCA, 
  ICA, 
  NMF, 
  Clustering as ClusteringIcon, 
  KMeans, 
  Hierarchical, 
  DBSCAN, 
  Gaussian, 
  Mixture, 
  Model, 
  EM, 
  Algorithm, 
  Expectation, 
  Maximization, 
  Gradient as GradientIcon, 
  Descent, 
  Ascent, 
  Stochastic, 
  Mini, 
  Batch as BatchIcon, 
  Adam, 
  RMSprop, 
  Adagrad, 
  Adadelta, 
  Momentum, 
  Nesterov, 
  Learning, 
  Schedule, 
  Decay, 
  Exponential as ExponentialIcon, 
  Polynomial, 
  Step as StepIcon, 
  Cosine, 
  Restart, 
  Annealing, 
  Simulated, 
  Genetic, 
  Evolution, 
  Mutation, 
  Selection as SelectionIcon, 
  Fitness, 
  Population as PopulationIcon, 
  Individual, 
  Chromosome, 
  Gene, 
  Allele, 
  Phenotype, 
  Genotype, 
  DNA as DNAIcon, 
  RNA, 
  Protein, 
  Amino, 
  Acid, 
  Nucleotide, 
  Base, 
  Pair, 
  Sequence, 
  Alignment, 
  BLAST, 
  Phylogeny, 
  Tree as TreeIcon, 
  Branch, 
  Leaf as LeafIcon, 
  Root, 
  Node as NodeIcon, 
  Edge, 
  Path, 
  Cycle as CycleIcon, 
  Loop as LoopIcon, 
  Directed, 
  Undirected, 
  Weighted, 
  Unweighted, 
  Connected, 
  Disconnected, 
  Complete, 
  Bipartite, 
  Planar, 
  Eulerian, 
  Hamiltonian, 
  Spanning, 
  Minimum, 
  Shortest, 
  Longest, 
  Diameter, 
  Radius, 
  Center, 
  Periphery, 
  Eccentricity, 
  Centrality, 
  Betweenness, 
  Closeness, 
  Degree as DegreeIcon, 
  Clustering as ClusteringIcon2, 
  Coefficient, 
  Transitivity, 
  Assortativity, 
  Modularity, 
  Community, 
  Partition, 
  Cut, 
  Flow, 
  Capacity, 
  Source, 
  Augmenting, 
  Network, 
  Social, 
  Biological, 
  Physical, 
  Mathematical, 
  Computational, 
  Theoretical, 
  Applied, 
  Pure, 
  Abstract, 
  Concrete, 
  Discrete, 
  Continuous, 
  Finite, 
  Infinite, 
  Countable, 
  Uncountable, 
  Rational, 
  Irrational, 
  Real, 
  Complex, 
  Imaginary, 
  Whole, 
  Prime, 
  Even, 
  Odd, 
  Positive, 
  Negative as NegativeIcon, 
  Zero, 
  One, 
  Two, 
  Three, 
  Four, 
  Five, 
  Six, 
  Seven, 
  Eight, 
  Nine, 
  Ten, 
  Hundred, 
  Thousand, 
  Million, 
  Billion, 
  Trillion, 
  Quadrillion, 
  Quintillion, 
  Sextillion, 
  Septillion, 
  Octillion, 
  Nonillion, 
  Decillion, 
  Googol, 
  Googolplex, 
  Infinity as InfinityIcon, 
  Aleph, 
  Omega, 
  Alpha, 
  Gamma as GammaIcon, 
  Delta, 
  Epsilon, 
  Zeta, 
  Eta, 
  Theta, 
  Iota, 
  Kappa, 
  Lambda, 
  Mu, 
  Nu, 
  Xi, 
  Pi as PiIcon, 
  Rho, 
  Sigma, 
  Tau, 
  Upsilon, 
  Phi, 
  Psi, 
  Omega as OmegaIcon,
  Type
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useMockAuth } from '../hooks/useMockAuth'

interface SettingsSection {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
}

interface SettingItem {
  id: string
  title: string
  description: string
  type: 'toggle' | 'select' | 'input' | 'slider' | 'button' | 'color' | 'file'
  value?: any
  options?: { label: string; value: any }[]
  min?: number
  max?: number
  step?: number
  action?: () => void
  icon?: React.ComponentType<any>
  danger?: boolean
}

interface SettingsSectionProps {
  section: SettingsSection
  settings: SettingItem[]
  onSettingChange: (settingId: string, value: any) => void
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ section, settings, onSettingChange }) => {
  const renderSettingControl = (setting: SettingItem) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={setting.value}
              onChange={(e) => onSettingChange(setting.id, e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        )
      
      case 'select':
        return (
          <select 
            value={setting.value}
            onChange={(e) => onSettingChange(setting.id, e.target.value)}
            className="px-3 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'input':
        return (
          <Input 
            value={setting.value}
            onChange={(e) => onSettingChange(setting.id, e.target.value)}
            variant="glass"
            className="w-48"
          />
        )
      
      case 'slider':
        return (
          <div className="flex items-center gap-3">
            <input 
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={setting.value}
              onChange={(e) => onSettingChange(setting.id, Number(e.target.value))}
              className="w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-white/70 text-sm w-12">{setting.value}</span>
          </div>
        )
      
      case 'button':
        return (
          <Button 
            variant={setting.danger ? 'danger' : 'glass'}
            size="sm"
            onClick={setting.action}
            icon={setting.icon}
          >
            {setting.title}
          </Button>
        )
      
      case 'color':
        return (
          <div className="flex items-center gap-3">
            <input 
              type="color"
              value={setting.value}
              onChange={(e) => onSettingChange(setting.id, e.target.value)}
              className="w-10 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
            />
            <span className="text-white/70 text-sm">{setting.value}</span>
          </div>
        )
      
      case 'file':
        return (
          <Button 
            variant="glass"
            size="sm"
            onClick={setting.action}
            icon={Upload}
          >
            Selecionar Arquivo
          </Button>
        )
      
      default:
        return null
    }
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${section.color}`}>
          <section.icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{section.title}</h3>
          <p className="text-white/60 text-sm">{section.description}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between p-4 bg-white/[0.06] rounded-lg">
            <div className="flex items-center gap-3">
              {setting.icon && (
                <setting.icon className="w-5 h-5 text-white/70" />
              )}
              <div>
                <p className="text-white font-medium">{setting.title}</p>
                <p className="text-white/60 text-sm">{setting.description}</p>
              </div>
            </div>
            
            {setting.type !== 'button' && (
              <div className="flex items-center gap-3">
                {renderSettingControl(setting)}
              </div>
            )}
            
            {setting.type === 'button' && renderSettingControl(setting)}
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export const Settings: React.FC = () => {
  const { user } = useMockAuth()
  const [activeCategory, setActiveCategory] = useState<string>('general')
  const [settings, setSettings] = useState<Record<string, any>>({
    // General Settings
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    theme: 'dark',
    autoSave: true,
    autoBackup: true,
    
    // Appearance Settings
    fontSize: 14,
    fontFamily: 'Inter',
    accentColor: '#3b82f6',
    sidebarPosition: 'left',
    compactMode: false,
    animations: true,
    transparency: 80,
    blur: 60,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    notificationVolume: 70,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
    
    // Privacy Settings
    profileVisibility: 'colleagues',
    showEmail: false,
    showPhone: false,
    showLastSeen: true,
    allowAnalytics: true,
    allowCookies: true,
    dataCollection: 'essential',
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    autoLock: true,
    autoLockTime: 15,
    biometricAuth: false,
    deviceTrust: true,
    
    // Performance Settings
    cacheSize: 500,
    preloadContent: true,
    backgroundSync: true,
    lowPowerMode: false,
    dataCompression: true,
    imageQuality: 'high',
    videoQuality: 'auto',
    
    // Accessibility Settings
    highContrast: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: true,
    reducedMotion: false,
    colorBlindMode: 'none',
    
    // Medical Settings
    defaultSpecialty: 'cardiologia',
    measurementUnits: 'metric',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: '24h',
    crmValidation: true,
    patientPrivacy: 'strict',
    
    // Integration Settings
    supabaseSync: true,
    cloudBackup: true,
    apiAccess: false,
    webhooks: false,
    thirdPartyIntegrations: true,
    
    // Advanced Settings
    debugMode: false,
    betaFeatures: false,
    experimentalFeatures: false,
    developerMode: false,
    logLevel: 'info'
  })

  const settingsSections: SettingsSection[] = [
    {
      id: 'general',
      title: 'Geral',
      description: 'Configurações básicas do sistema',
      icon: SettingsIcon,
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      id: 'appearance',
      title: 'Aparência',
      description: 'Personalização visual da interface',
      icon: Palette,
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      id: 'notifications',
      title: 'Notificações',
      description: 'Configurações de alertas e avisos',
      icon: Bell,
      color: 'bg-yellow-500/20 text-yellow-400'
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      description: 'Controle de dados e visibilidade',
      icon: Shield,
      color: 'bg-green-500/20 text-green-400'
    },
    {
      id: 'security',
      title: 'Segurança',
      description: 'Autenticação e proteção da conta',
      icon: Lock,
      color: 'bg-red-500/20 text-red-400'
    },
    {
      id: 'performance',
      title: 'Performance',
      description: 'Otimização e velocidade do sistema',
      icon: Zap,
      color: 'bg-orange-500/20 text-orange-400'
    },
    {
      id: 'accessibility',
      title: 'Acessibilidade',
      description: 'Recursos para melhor usabilidade',
      icon: Accessibility,
      color: 'bg-indigo-500/20 text-indigo-400'
    },
    {
      id: 'medical',
      title: 'Médico',
      description: 'Configurações específicas da área médica',
      icon: Stethoscope,
      color: 'bg-teal-500/20 text-teal-400'
    },
    {
      id: 'integrations',
      title: 'Integrações',
      description: 'Conexões com serviços externos',
      icon: Wifi,
      color: 'bg-cyan-500/20 text-cyan-400'
    },
    {
      id: 'advanced',
      title: 'Avançado',
      description: 'Configurações para usuários experientes',
      icon: Cpu,
      color: 'bg-gray-500/20 text-gray-400'
    }
  ]

  const getSettingsForCategory = (categoryId: string): SettingItem[] => {
    switch (categoryId) {
      case 'general':
        return [
          {
            id: 'language',
            title: 'Idioma',
            description: 'Idioma da interface do sistema',
            type: 'select',
            value: settings.language,
            options: [
              { label: 'Português (Brasil)', value: 'pt-BR' },
              { label: 'English (US)', value: 'en-US' },
              { label: 'Español', value: 'es-ES' },
              { label: 'Français', value: 'fr-FR' },
              { label: 'Deutsch', value: 'de-DE' }
            ],
            icon: Languages
          },
          {
            id: 'timezone',
            title: 'Fuso Horário',
            description: 'Fuso horário para exibição de datas e horários',
            type: 'select',
            value: settings.timezone,
            options: [
              { label: 'São Paulo (GMT-3)', value: 'America/Sao_Paulo' },
              { label: 'New York (GMT-5)', value: 'America/New_York' },
              { label: 'London (GMT+0)', value: 'Europe/London' },
              { label: 'Tokyo (GMT+9)', value: 'Asia/Tokyo' },
              { label: 'Sydney (GMT+10)', value: 'Australia/Sydney' }
            ],
            icon: Globe
          },
          {
            id: 'theme',
            title: 'Tema',
            description: 'Aparência geral do sistema',
            type: 'select',
            value: settings.theme,
            options: [
              { label: 'Escuro', value: 'dark' },
              { label: 'Claro', value: 'light' },
              { label: 'Automático', value: 'auto' }
            ],
            icon: Moon
          },
          {
            id: 'autoSave',
            title: 'Salvamento Automático',
            description: 'Salvar alterações automaticamente',
            type: 'toggle',
            value: settings.autoSave,
            icon: Save
          },
          {
            id: 'autoBackup',
            title: 'Backup Automático',
            description: 'Criar backups automáticos dos dados',
            type: 'toggle',
            value: settings.autoBackup,
            icon: Database
          },
          {
            id: 'imageQuality',
            title: 'Qualidade de Imagem',
            description: 'Qualidade das imagens carregadas',
            type: 'select',
            value: settings.imageQuality,
            options: [
              { label: 'Baixa', value: 'low' },
              { label: 'Média', value: 'medium' },
              { label: 'Alta', value: 'high' },
              { label: 'Original', value: 'original' }
            ],
            icon: Image
          },
          {
            id: 'videoQuality',
            title: 'Qualidade de Vídeo',
            description: 'Qualidade dos vídeos reproduzidos',
            type: 'select',
            value: settings.videoQuality,
            options: [
              { label: '480p', value: '480p' },
              { label: '720p', value: '720p' },
              { label: '1080p', value: '1080p' },
              { label: 'Automático', value: 'auto' }
            ],
            icon: Video
          },
          {
            id: 'clearCache',
            title: 'Limpar Cache',
            description: 'Remover arquivos temporários',
            type: 'button',
            action: () => console.log('Clear cache'),
            icon: Trash2
          }
        ]
      
      case 'accessibility':
        return [
          {
            id: 'highContrast',
            title: 'Alto Contraste',
            description: 'Aumentar contraste para melhor visibilidade',
            type: 'toggle',
            value: settings.highContrast,
            icon: Eye
          },
          {
            id: 'largeText',
            title: 'Texto Grande',
            description: 'Aumentar tamanho do texto',
            type: 'toggle',
            value: settings.largeText,
            icon: Type
          },
          {
            id: 'screenReader',
            title: 'Leitor de Tela',
            description: 'Compatibilidade com leitores de tela',
            type: 'toggle',
            value: settings.screenReader,
            icon: Volume2
          },
          {
            id: 'keyboardNavigation',
            title: 'Navegação por Teclado',
            description: 'Habilitar navegação completa por teclado',
            type: 'toggle',
            value: settings.keyboardNavigation,
            icon: Keyboard
          },
          {
            id: 'reducedMotion',
            title: 'Movimento Reduzido',
            description: 'Reduzir animações e movimentos',
            type: 'toggle',
            value: settings.reducedMotion,
            icon: Pause
          },
          {
            id: 'colorBlindMode',
            title: 'Modo Daltonismo',
            description: 'Ajustar cores para daltonismo',
            type: 'select',
            value: settings.colorBlindMode,
            options: [
              { label: 'Nenhum', value: 'none' },
              { label: 'Protanopia', value: 'protanopia' },
              { label: 'Deuteranopia', value: 'deuteranopia' },
              { label: 'Tritanopia', value: 'tritanopia' }
            ],
            icon: Eye
          }
        ]
      
      case 'medical':
        return [
          {
            id: 'defaultSpecialty',
            title: 'Especialidade Padrão',
            description: 'Sua especialidade médica principal',
            type: 'select',
            value: settings.defaultSpecialty,
            options: [
              { label: 'Cardiologia', value: 'cardiologia' },
              { label: 'Neurologia', value: 'neurologia' },
              { label: 'Ortopedia', value: 'ortopedia' },
              { label: 'Pediatria', value: 'pediatria' },
              { label: 'Ginecologia', value: 'ginecologia' },
              { label: 'Dermatologia', value: 'dermatologia' },
              { label: 'Psiquiatria', value: 'psiquiatria' },
              { label: 'Oftalmologia', value: 'oftalmologia' },
              { label: 'Otorrinolaringologia', value: 'otorrino' },
              { label: 'Urologia', value: 'urologia' }
            ],
            icon: Stethoscope
          },
          {
            id: 'measurementUnits',
            title: 'Unidades de Medida',
            description: 'Sistema de medidas preferido',
            type: 'select',
            value: settings.measurementUnits,
            options: [
              { label: 'Métrico (kg, cm, °C)', value: 'metric' },
              { label: 'Imperial (lb, ft, °F)', value: 'imperial' }
            ],
            icon: Ruler
          },
          {
            id: 'dateFormat',
            title: 'Formato de Data',
            description: 'Como as datas são exibidas',
            type: 'select',
            value: settings.dateFormat,
            options: [
              { label: 'DD/MM/AAAA', value: 'dd/mm/yyyy' },
              { label: 'MM/DD/AAAA', value: 'mm/dd/yyyy' },
              { label: 'AAAA-MM-DD', value: 'yyyy-mm-dd' }
            ],
            icon: Calendar
          },
          {
            id: 'timeFormat',
            title: 'Formato de Hora',
            description: 'Formato de exibição do horário',
            type: 'select',
            value: settings.timeFormat,
            options: [
              { label: '24 horas', value: '24h' },
              { label: '12 horas (AM/PM)', value: '12h' }
            ],
            icon: Clock
          },
          {
            id: 'crmValidation',
            title: 'Validação de CRM',
            description: 'Verificar validade do registro médico',
            type: 'toggle',
            value: settings.crmValidation,
            icon: ShieldCheck
          },
          {
            id: 'patientPrivacy',
            title: 'Privacidade do Paciente',
            description: 'Nível de proteção dos dados do paciente',
            type: 'select',
            value: settings.patientPrivacy,
            options: [
              { label: 'Básica', value: 'basic' },
              { label: 'Rigorosa', value: 'strict' },
              { label: 'Máxima', value: 'maximum' }
            ],
            icon: Shield
          }
        ]
      
      case 'integrations':
        return [
          {
            id: 'supabaseSync',
            title: 'Sincronização Supabase',
            description: 'Sincronizar dados com Supabase',
            type: 'toggle',
            value: settings.supabaseSync,
            icon: Database
          },
          {
            id: 'cloudBackup',
            title: 'Backup na Nuvem',
            description: 'Fazer backup automático na nuvem',
            type: 'toggle',
            value: settings.cloudBackup,
            icon: Cloud
          },
          {
            id: 'apiAccess',
            title: 'Acesso à API',
            description: 'Permitir acesso via API externa',
            type: 'toggle',
            value: settings.apiAccess,
            icon: Key
          },
          {
            id: 'webhooks',
            title: 'Webhooks',
            description: 'Habilitar notificações via webhook',
            type: 'toggle',
            value: settings.webhooks,
            icon: Link
          },
          {
            id: 'thirdPartyIntegrations',
            title: 'Integrações de Terceiros',
            description: 'Permitir conexões com serviços externos',
            type: 'toggle',
            value: settings.thirdPartyIntegrations,
            icon: ExternalLink
          },
          {
            id: 'exportData',
            title: 'Exportar Dados',
            description: 'Baixar todos os seus dados',
            type: 'button',
            action: () => console.log('Export data'),
            icon: Download
          },
          {
            id: 'importData',
            title: 'Importar Dados',
            description: 'Carregar dados de backup',
            type: 'button',
            action: () => console.log('Import data'),
            icon: Upload
          }
        ]
      
      case 'advanced':
        return [
          {
            id: 'debugMode',
            title: 'Modo Debug',
            description: 'Habilitar informações de depuração',
            type: 'toggle',
            value: settings.debugMode,
            icon: Bug
          },
          {
            id: 'betaFeatures',
            title: 'Recursos Beta',
            description: 'Acessar funcionalidades em teste',
            type: 'toggle',
            value: settings.betaFeatures,
            icon: TestTube
          },
          {
            id: 'experimentalFeatures',
            title: 'Recursos Experimentais',
            description: 'Funcionalidades experimentais (instável)',
            type: 'toggle',
            value: settings.experimentalFeatures,
            icon: FlaskConical
          },
          {
            id: 'developerMode',
            title: 'Modo Desenvolvedor',
            description: 'Ferramentas para desenvolvedores',
            type: 'toggle',
            value: settings.developerMode,
            icon: Code
          },
          {
            id: 'logLevel',
            title: 'Nível de Log',
            description: 'Detalhamento dos logs do sistema',
            type: 'select',
            value: settings.logLevel,
            options: [
              { label: 'Error', value: 'error' },
              { label: 'Warn', value: 'warn' },
              { label: 'Info', value: 'info' },
              { label: 'Debug', value: 'debug' },
              { label: 'Verbose', value: 'verbose' }
            ],
            icon: FileText
          },
          {
            id: 'resetSettings',
            title: 'Restaurar Padrões',
            description: 'Voltar às configurações originais',
            type: 'button',
            action: () => console.log('Reset settings'),
            icon: RotateCcw,
            danger: true
          },
          {
            id: 'deleteAccount',
            title: 'Excluir Conta',
            description: 'Remover permanentemente sua conta',
            type: 'button',
            action: () => console.log('Delete account'),
            icon: Trash2,
            danger: true
          }
        ]
      
      default:
        return []
    }
  }

  const handleSettingChange = (settingId: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: value
    }))
  }

  const activeSection = settingsSections.find(section => section.id === activeCategory)
  const activeSectionSettings = getSettingsForCategory(activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
          <p className="text-white/60">Personalize sua experiência na plataforma</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4">
              <div className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveCategory(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      activeCategory === section.id
                        ? 'bg-white/[0.12] text-white'
                        : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.color}`}>
                      <section.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs opacity-70">{section.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeSection && (
              <SettingsSection
                section={activeSection}
                settings={activeSectionSettings}
                onSettingChange={handleSettingChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings