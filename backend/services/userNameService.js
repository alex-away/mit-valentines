const romanticUsernamesBoys = [
    "MrMajnu", "LovePrince", "RomeoHearts", "CharmingRaj", "KingOfHearts", "HeartStealer", 
    "TrueLover", "PrinceCharming", "MrPerfect", "SoulmateSeeker", "MagicLover", "EverlastingLove",
    "CasanovaKing", "DreamBoy", "HeartThrob", "ShyRomantic", "PassionateRaj", "SweetTalker",
    "DeepLover", "LuvGuru", "HandsomeRomeo", "ForeverYours", "YourKnight", "LoveGuru",
    "BollywoodLover", "HuskyVoice", "HotshotRomeo", "RosyCheeks", "RedRoseLover", "FlirtyGuy",
    "SilentLover", "DarkPrince", "MoonlightLover", "DreamyEyes", "HopelessRomantic", "FallingForYou",
    "EverAfterRaj", "RosesForYou", "EternalFlame", "MeltedHeart", "CuddlePrince", "MidnightLover",
    "TeraNaa", "DilwaleRaj", "AashiqNumberOne", "TuMeriJaan", "FeelMyLove", "MehboobMera",
    "PremPujari", "TeraDewana", "MagicKiss", "HandsomeDevil", "CrazyForYou", "KnightOfLove",
    "LoveyDovey", "GentleHeart", "LuvPanda", "PassionateKnight", "DilKaRaja", "SizzlingLove",
    "YourSweetheart", "CaringRomeo", "MrLoyal", "LoveAddict", "ForeverMine", "TeraIntezar",
    "AwarapanLover", "ChocoLover", "LoveHunk", "LoyalDost", "RomanticJeevan", "SweetPrince",
    "LuvBird", "KingOfFlirts", "TuHiMeri", "RajKeDilSe", "AdorableRaj", "DeepPassion",
    "UnforgettableLover", "DreamyRaj", "LoveGenius", "HeartfeltLove", "LovePhilosopher",
    "CuteLoverBoy", "EnchantedLove", "CrazyRomantic", "RosePetalLover", "LoveDareDevil",
    "MoonlitRomeo", "DilSeRaj", "FairyTaleRaj", "MyOnlyLuv", "SeriousRomantic", "TeraDeewana",
    "LoveInfinity", "CupidPrince", "OnlyForYou", "CharmingMystery", "CandlelightRomeo",
    "TrueLoveBeliever", "HotLover", "LoveDevil", "SugarLipsLover", "OneHeartRaj", "MeriJaan",
    "CrazyDilwala", "BollywoodHero", "DarlingPrince", "HameshaTera", "SoulmateHunter",
    "DardEKahani", "PyarSeRaj", "MrSweetTalk", "MeriDilruba", "OneAndOnly", "ChocoRomeo",
    "PassionatelyYours", "LoveSeeker", "AlwaysYours", "TeraAshiq", "MagicLoveBoy", "FlirtyRaj",
    "DeepInLove", "JaanEMann", "PyaarWalaRaj", "AashiqDilSe", "LovinglyYours", "StarryEyedRaj",
    "CharmingHunk", "EternalSoulmate", "DreamBoyLover", "OnlyYours", "PyaarHiPyaar", "RajKaDil",
    "MyLoveStory", "SweetestLover", "PyaarKaDevta", "HameshaLuv", "FairyTaleLover", "TeraPyar",
    "JanamJanamKaLuv", "ForeverPyaar", "AashiqMehboob", "YoursForever", "MagicalHugs", "FeelMyLove",
    "LoveIsLife", "TeraIshq", "DilSePyaar", "PrinceAdorable", "HuggyLover", "CrazySweetheart",
    "YehHaiPyaar", "ChocoKing", "JanamJanamKaBandhan", "UnbreakableLuv", "HeartyRaj", "LuvAngel",
    "ForeverRaj", "TeraDilwala", "SweetestHunk", "PremKaDeewana", "CharmingSoulmate"
  ];
  
  const romanticUsernamesGirls = [
    "TeriRani", "LoveQueen", "JulietHearts", "CharmingRiya", "QueenOfHearts", "HeartThief",
    "TrueLoverGirl", "PrincessCharming", "MissPerfect", "SoulmateSeekeress", "MagicLoverGirl",
    "EverlastingLovee", "DreamGirl", "HeartThrobGirl", "ShyRomanticBabe", "PassionateRiya",
    "SweetTalkerGirl", "DeepLoverBabe", "LuvAngel", "CaringJuliet", "ForeverYoursBabe",
    "LoveFairy", "BollywoodPrincess", "RosyLips", "ButterflyLover", "SilentLoverGirl",
    "MoonlightLover", "DreamyEyesBabe", "HopelessRomanticGirl", "FallingForYouBabe",
    "CuddleQueen", "TeraNaa", "DilwaliRani", "AashiquiBabe", "TuMeriJaanu", "MehboobaMeri",
    "PremRani", "TeraDewani", "MagicKissQueen", "CrazyForYouBabe", "LoveQueenForever",
    "LoyalSoulmate", "CuteJuliet", "PassionateQueen", "DilKiRani", "SizzlingLoveBabe",
    "YourAngel", "CaringPrincess", "LoyalSweetheart", "LoveAddictBabe", "EternalJuliet",
    "AwarapanLoverGirl", "PyaariGudiya", "LuvBirdie", "TuHiMeriRani", "RajKeDilSeQueen",
    "AdorableSweetie", "DeepPyaar", "UnforgettableQueen", "DreamyRiya", "LoveGeniusGirl",
    "HeartfeltJuliet", "MoonlitJuliet", "DilSeRani", "FairyTaleJuliet", "MyOnlyLuvBabe",
    "SeriousLoverGirl", "TeriDeewani", "LoveInfinityGirl", "CupidQueen", "OnlyForYouBabe",
    "CandlelightJuliet", "TrueLovePrincess", "HotLoverGirl", "SugarLipsBabe", "OneHeartRani",
    "MeriJaanu", "CrazyDilwali", "BollywoodHeroine", "HameshaTeri", "SoulmateFinder",
    "PyaariMeri", "PyaarSeRani", "SweetestLoverGirl", "TeraHiLover", "LovingPrincess",
    "JaanEMannBabe", "PyaariGudiya", "AashiqDilSeRani", "LovinglyYoursBabe", "CharmingDoll",
    "EternalSoulmateBabe", "DreamGirlLover", "OnlyYoursBabe", "PyaarWaliRani", "MyLoveStoryQueen",
    "TeraHiLoverBabe", "SweetestJuliet", "ForeverPyaarGirl", "AashiqMehbooba", "YoursForeverBabe",
    "MagicalHugsBabe", "FeelMyLoveBabe", "LoveIsLifeGirl", "TeraIshqRani", "DilSePyaari",
    "PrincessAdorable", "HuggyJuliet", "CrazySweetheartGirl", "YehHaiPyaar", "ChocoQueen",
    "JanamJanamKaBandhanBabe", "UnbreakableLuvGirl", "HeartyRani", "SweetestHunkGirl"
  ];
  
  const name_generator_config_boys = {
    dictionaries: [romanticUsernamesBoys],
    separator: '-',
    style: 'capital',
    randomDigits: 3
  }
  
  const name_generator_config_girls = {
    dictionaries: [romanticUsernamesGirls],
    separator: '-',
    style: 'capital',
    randomDigits: 3
  }

  module.exports = {name_generator_config_boys,name_generator_config_girls};