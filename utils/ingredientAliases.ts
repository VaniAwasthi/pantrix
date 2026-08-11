import { normalizeIngredient } from "@/utils/helpers";

/**
 * Hindi ↔ English (and plural) ingredient aliases for Pantrix matching.
 * Example: tomato === tomatoes === tamatar === Tamatar
 */
export const INGREDIENT_ALIAS_GROUPS: string[][] = [
  ["tomato", "tomatoes", "tamatar", "tamaatar"],
  ["onion", "onions", "pyaaz", "pyaz", "kanda", "kande"],
  ["potato", "potatoes", "aloo", "alu", "batata"],
  ["garlic", "lahsun", "lehsun"],
  ["ginger", "adrak"],
  ["carrot", "carrots", "gajar"],
  ["capsicum", "shimla mirch", "bell pepper", "shimla mirchi"],
  ["spinach", "palak", "paalak"],
  ["cabbage", "patta gobhi", "bandh gobi"],
  ["cauliflower", "gobi", "gobhi", "phool gobhi"],
  ["peas", "matar", "green peas", "hare matar", "peas / matar"],
  ["okra", "bhindi", "lady finger", "bhindi / okra"],
  ["eggplant", "brinjal", "baingan", "baigan", "baingan / brinjal"],
  ["bottle gourd", "lauki", "doodhi", "ghiya"],
  ["ridge gourd", "tori", "turai"],
  ["apple gourd", "tinda"],
  ["bitter gourd", "karela"],
  ["pumpkin", "kaddu", "kaddu / pumpkin"],
  ["corn", "makkai", "bhutta", "sweet corn"],
  ["mushroom", "mushrooms", "khumb"],
  ["green chilli", "green chili", "hari mirch", "mirchi"],
  ["lemon", "nimbu", "lime", "lemon / nimbu"],
  ["cucumber", "kheera", "kakdi"],
  ["radish", "mooli", "muli", "mooli / radish"],
  ["fenugreek leaves", "methi", "methi leaves"],
  ["mint", "pudina"],
  ["coriander", "dhania", "cilantro"],
  ["beans", "french beans", "sem"],
  ["sprouts", "moong sprouts"],
  ["banana", "bananas", "kela"],
  ["mango", "mangoes", "aam"],
  ["apple", "apples", "seb"],
  ["orange", "oranges", "santra"],
  ["coconut", "nariyal"],
  ["milk", "doodh"],
  ["curd", "yogurt", "dahi", "curd / yogurt", "yoghurt"],
  ["paneer", "cottage cheese"],
  ["butter", "makhan"],
  ["ghee", "desi ghee"],
  ["cheese", "processed cheese"],
  ["cream", "malai", "fresh cream", "cream / malai"],
  ["lassi", "chaas", "buttermilk", "chhach"],
  ["rice", "chawal", "basmati"],
  ["atta", "flour", "wheat flour", "atta / flour"],
  ["besan", "gram flour", "chickpea flour"],
  ["rava", "sooji", "semolina", "suji", "rava / suji"],
  ["poha", "flattened rice"],
  ["oats", "oatmeal"],
  ["dalia", "broken wheat"],
  ["sabudana", "tapioca", "sago"],
  ["maida", "all purpose flour"],
  ["bajra", "pearl millet"],
  ["jowar", "sorghum"],
  ["makki", "makki atta", "corn flour"],
  ["puffed rice", "murmura", "kurmura"],
  ["dal", "daal", "lentils"],
  ["moong dal", "moong", "mung dal"],
  ["masoor dal", "masoor"],
  ["chana dal", "bengal gram"],
  ["toor dal", "arhar dal", "tuvar dal", "toor / arhar dal"],
  ["urad dal", "urad"],
  ["rajma", "kidney beans"],
  ["chole", "chickpeas", "kabuli chana", "chole / chickpeas"],
  ["peanut", "peanuts", "moongphali", "peanut / moongphali"],
  ["almond", "almonds", "badam", "almond / badam"],
  ["cashew", "cashews", "kaju", "cashew / kaju"],
  ["pistachio", "pistachios", "pista", "pistachio / pista"],
  ["walnut", "walnuts", "akhrot", "walnut / akhrot"],
  ["raisin", "raisins", "kishmish", "raisin / kishmish"],
  ["dates", "khajoor", "dates / khajoor"],
  ["makhana", "fox nuts", "makhana / fox nuts"],
  ["sesame", "til", "sesame / til"],
  ["flax seeds", "alsi", "flax seeds / alsi"],
  ["chia seeds"],
  ["pumpkin seeds"],
  ["sunflower seeds"],
  ["charoli", "chironji", "charoli / chironji"],
  ["melon seeds", "magaz", "melon seeds / magaz"],
  ["turmeric", "haldi", "turmeric / haldi"],
  ["cumin", "jeera", "zeera", "cumin / jeera"],
  ["cumin powder"],
  ["coriander seeds", "dhania", "coriander seeds / dhania"],
  ["coriander powder"],
  ["chilli powder", "chili powder", "lal mirch", "red chilli powder / lal mirch"],
  ["kashmiri chilli", "kashmiri chilli powder"],
  ["salt", "namak", "salt / namak"],
  ["black salt", "kala namak", "black salt / kala namak"],
  ["black pepper", "kali mirch", "black pepper / kali mirch"],
  ["cardamom", "elaichi", "green cardamom", "green cardamom / elaichi", "cardamom / elaichi"],
  ["black cardamom", "badi elaichi", "black cardamom / badi elaichi"],
  ["cinnamon", "dalchini", "cinnamon / dalchini"],
  ["clove", "laung", "clove / laung"],
  ["bay leaf", "tej patta", "bay leaf / tej patta"],
  ["mustard seeds", "rai", "sarson", "mustard seeds / rai"],
  ["fenugreek seeds", "methi dana", "fenugreek seeds / methi dana"],
  ["fennel", "saunf", "fennel / saunf"],
  ["carom", "ajwain", "carom / ajwain"],
  ["nigella", "kalonji", "nigella / kalonji"],
  ["asafoetida", "hing", "asafoetida / hing"],
  ["curry leaves", "kadi patta", "curry leaves / kadi patta"],
  ["star anise", "chakri phool", "star anise / chakri phool"],
  ["mace", "javitri", "mace / javitri"],
  ["nutmeg", "jaiphal", "nutmeg / jaiphal"],
  ["saffron", "kesar", "saffron / kesar"],
  ["kasuri methi"],
  ["amchur", "dry mango powder", "amchur / dry mango powder"],
  ["anardana", "pomegranate seeds", "anardana / pomegranate seeds"],
  ["poppy seeds", "khus khus", "poppy seeds / khus khus"],
  ["rock salt", "sendha namak", "rock salt / sendha namak"],
  ["jaggery", "gur", "jaggery / gur"],
  ["chaat masala"],
  ["pav bhaji masala"],
  ["chole masala"],
  ["biryani masala"],
  ["tandoori masala"],
  ["sambar powder"],
  ["rasam powder"],
  ["kitchen king", "kitchen king masala"],
  ["garam masala"],
  ["soy sauce"],
  ["vinegar"],
  ["cooking oil", "oil", "vegetable oil", "tel"],
  ["mustard oil", "sarson oil"],
  ["olive oil"],
  ["coconut oil"],
  ["tea", "chai"],
  ["coffee"],
  ["bhujia"],
  ["mixture", "namkeen mixture"],
  ["marie biscuit", "biscuit", "biscuits"],
  ["potato chips", "chips"],
  ["sev"],
];

const ALIAS_LOOKUP: Map<string, string> = (() => {
  const map = new Map<string, string>();
  for (const group of INGREDIENT_ALIAS_GROUPS) {
    const canonical = normalizeIngredient(group[0]);
    for (const alias of group) {
      map.set(normalizeIngredient(alias), canonical);
    }
  }
  return map;
})();

export function canonicalIngredient(name: string): string {
  const n = normalizeIngredient(name);
  if (!n) return "";

  if (ALIAS_LOOKUP.has(n)) return ALIAS_LOOKUP.get(n)!;

  // tomatoes → tomato
  if (n.endsWith("oes") && n.length > 4) {
    const singular = n.slice(0, -2);
    if (ALIAS_LOOKUP.has(singular)) return ALIAS_LOOKUP.get(singular)!;
  }
  if (n.endsWith("s") && n.length > 3) {
    const singular = n.slice(0, -1);
    if (ALIAS_LOOKUP.has(singular)) return ALIAS_LOOKUP.get(singular)!;
  }

  for (const [alias, canonical] of ALIAS_LOOKUP) {
    if (alias.length >= 4 && (n.includes(alias) || alias.includes(n))) {
      return canonical;
    }
  }

  return n;
}

export function ingredientsMatch(a: string, b: string): boolean {
  const ca = canonicalIngredient(a);
  const cb = canonicalIngredient(b);
  if (!ca || !cb) return false;
  if (ca === cb) return true;
  if (ca.includes(cb) || cb.includes(ca)) {
    return Math.min(ca.length, cb.length) >= 3;
  }
  return false;
}
