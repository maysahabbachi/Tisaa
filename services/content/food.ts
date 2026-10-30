import { topic, wordBank, type TopicSet } from './types';
export const food: TopicSet = { words: wordBank(`
apple|تفاح|Apple|Pomme
banana|موز|Banana|Banane
orange|برتقال|Orange|Orange
grape|عنب|Grape|Raisin
mango|مانجو|Mango|Mangue
pear|كمثرى|Pear|Poire
peach|خوخ|Peach|Pêche
plum|برقوق|Plum|Prune
kiwi|كيوي|Kiwi|Kiwi
lemon|ليمون|Lemon|Citron
lime|ليمون أخضر|Lime|Citron vert
grapefruit|جريب فروت|Grapefruit|Pamplemousse
mandarin|يوسفي|Mandarin|Mandarine
clementine|كليمنتين|Clementine|Clémentine
pomelo|بوميلو|Pomelo|Pomelo
kumquat|برتقال ذهبي|Kumquat|Kumquat
bergamot|برغموت|Bergamot|Bergamote
citron|أترج|Citron fruit|Cédrat
strawberry|فراولة|Strawberry|Fraise
raspberry|توت العليق|Raspberry|Framboise
blueberry|توت أزرق|Blueberry|Myrtille
blackberry|توت أسود|Blackberry|Mûre
cherry|كرز|Cherry|Cerise
pomegranate|رمان|Pomegranate|Grenade
watermelon|بطيخ|Watermelon|Pastèque
melon|شمام|Melon|Melon
pineapple|أناناس|Pineapple|Ananas
papaya|بابايا|Papaya|Papaye
coconut|جوز هند|Coconut|Noix de coco
guava|جوافة|Guava|Goyave
passion|فاكهة العاطفة|Passion fruit|Fruit de la passion
lychee|ليتشي|Lychee|Litchi
dragon|فاكهة التنين|Dragon fruit|Fruit du dragon
date|تمر|Date|Datte
fig|تين|Fig|Figue
apricot|مشمش|Apricot|Abricot
raisin|زبيب|Raisin|Raisin sec
prune|قراصيا|Prune|Pruneau
tomato|طماطم|Tomato|Tomate
potato|بطاطس|Potato|Pomme de terre
carrot|جزر|Carrot|Carotte
onion|بصل|Onion|Oignon
cucumber|خيار|Cucumber|Concombre
pepper|فلفل حلو|Bell pepper|Poivron
zucchini|كوسا|Courgette|Courgette
eggplant|باذنجان|Eggplant|Aubergine
broccoli|بروكلي|Broccoli|Brocoli
lettuce|خس|Lettuce|Laitue
spinach|سبانخ|Spinach|Épinard
cabbage|ملفوف|Cabbage|Chou
kale|كرنب أجعد|Kale|Chou kale
arugula|جرجير|Arugula|Roquette
chard|سلق|Chard|Blette
parsley|بقدونس|Parsley|Persil
mint|نعناع|Mint|Menthe
basil|ريحان|Basil|Basilic
turnip|لفت|Turnip|Navet
beet|شمندر|Beetroot|Betterave
radish|فجل|Radish|Radis
sweetpotato|بطاطا حلوة|Sweet potato|Patate douce
garlic|ثوم|Garlic|Ail
ginger|زنجبيل|Ginger|Gingembre
celeriac|كرفس جذري|Celeriac|Céleri-rave
lentil|عدس|Lentil|Lentille
chickpea|حمص|Chickpea|Pois chiche
bean|فاصولياء|Bean|Haricot
pea|بازلاء|Pea|Petit pois
fava|فول|Fava bean|Fève
soy|صويا|Soybean|Soja
peanut|فول سوداني|Peanut|Cacahuète
lupin|ترمس|Lupin|Lupin
mung|ماش|Mung bean|Haricot mungo
rice|أرز|Rice|Riz
wheat|قمح|Wheat|Blé
barley|شعير|Barley|Orge
oats|شوفان|Oats|Avoine
corn|ذرة|Corn|Maïs
rye|جاودار|Rye|Seigle
millet|دخن|Millet|Millet
sorghum|ذرة رفيعة|Sorghum|Sorgho
quinoa|كينوا|Quinoa|Quinoa
almond|لوز|Almond|Amande
walnut|جوز|Walnut|Noix
hazelnut|بندق|Hazelnut|Noisette
pistachio|فستق|Pistachio|Pistache
cashew|كاجو|Cashew|Noix de cajou
pecan|بيكان|Pecan|Noix de pécan
macadamia|مكاديميا|Macadamia|Noix de macadamia
brazilnut|جوز برازيلي|Brazil nut|Noix du Brésil
pine|صنوبر|Pine nut|Pignon
salt|ملح|Salt|Sel
blackpepper|فلفل أسود|Black pepper|Poivre noir
cumin|كمون|Cumin|Cumin
cinnamon|قرفة|Cinnamon|Cannelle
turmeric|كركم|Turmeric|Curcuma
paprika|بابريكا|Paprika|Paprika
clove|قرنفل|Clove|Clou de girofle
cardamom|هيل|Cardamom|Cardamome
nutmeg|جوزة الطيب|Nutmeg|Noix de muscade
thyme|زعتر|Thyme|Thym
rosemary|إكليل الجبل|Rosemary|Romarin
oregano|أوريغانو|Oregano|Origan
dill|شبت|Dill|Aneth
coriander|كزبرة|Coriander|Coriandre
sage|مريمية|Sage|Sauge
milk|حليب|Milk|Lait
yogurt|زبادي|Yogurt|Yaourt
cheese|جبن|Cheese|Fromage
butter|زبدة|Butter|Beurre
cream|قشدة|Cream|Crème
labneh|لبنة|Labneh|Labné
kefir|كفير|Kefir|Kéfir
ghee|سمن حيواني|Ghee|Ghee
icecream|آيس كريم|Ice cream|Glace
bread|خبز|Bread|Pain
egg|بيض|Egg|Œuf
honey|عسل|Honey|Miel
jam|مربى|Jam|Confiture
olive|زيتون|Olive|Olive
tea|شاي|Tea|Thé
coffee|قهوة|Coffee|Café
water|ماء|Water|Eau
juice|عصير|Juice|Jus
lemonade|ليمونادة|Lemonade|Limonade
cocoa|كاكاو ساخن|Hot cocoa|Chocolat chaud
smoothie|سموثي|Smoothie|Smoothie
soda|مشروب غازي|Soft drink|Soda
herbal|شاي أعشاب|Herbal tea|Tisane
cake|كعكة|Cake|Gâteau
cookie|بسكويت|Cookie|Biscuit
brownie|براوني|Brownie|Brownie
pudding|بودينغ|Pudding|Pudding
tart|تارت|Tart|Tarte
baklava|بقلاوة|Baklava|Baklava
kunafa|كنافة|Kunafa|Knafé
halva|حلاوة طحينية|Halva|Halva
chocolate|شوكولاتة|Chocolate|Chocolat
pizza|بيتزا|Pizza|Pizza
pasta|معكرونة|Pasta|Pâtes
risotto|ريزوتو|Risotto|Risotto
lasagna|لازانيا|Lasagna|Lasagnes
gnocchi|نيوكي|Gnocchi|Gnocchi
ravioli|رافيولي|Ravioli|Raviolis
focaccia|فوكاتشا|Focaccia|Focaccia
bruschetta|بروسكيتا|Bruschetta|Bruschetta
tiramisu|تيراميسو|Tiramisu|Tiramisu
hummus|حمص بالطحينة|Hummus|Houmous
falafel|فلافل|Falafel|Falafel
tabbouleh|تبولة|Tabbouleh|Taboulé
fattoush|فتوش|Fattoush|Fattouche
shawarma|شاورما|Shawarma|Chawarma
kibbeh|كبة|Kibbeh|Kebbé
mansaf|منسف|Mansaf|Mansaf
maqluba|مقلوبة|Maqluba|Maqlouba
musakhan|مسخن|Musakhan|Moussakhan
couscous|كسكس|Couscous|Couscous
tagine|طاجين|Tagine|Tajine
harira|حريرة|Harira|Harira
brik|بريك|Brik|Brik
chorba|شوربة|Chorba|Chorba
shakshuka|شكشوكة|Shakshuka|Chakchouka
pastilla|بسطيلة|Pastilla|Pastilla
baghrir|بغرير|Baghrir|Baghrir
msemen|مسمن|Msemen|Msemen
ketchup|كاتشب|Ketchup|Ketchup
mayo|مايونيز|Mayonnaise|Mayonnaise
mustard|خردل|Mustard|Moutarde
soySauce|صلصة صويا|Soy sauce|Sauce soja
pesto|بيستو|Pesto|Pesto
tahini|طحينة|Tahini|Tahini
salsa|سالسا|Salsa|Salsa
hotSauce|صلصة حارة|Hot sauce|Sauce piquante
bbq|صلصة باربكيو|Barbecue sauce|Sauce barbecue
salmon|سلمون|Salmon|Saumon
tuna|تونة|Tuna|Thon
sardine|سردين|Sardine|Sardine
cod|قد|Cod|Cabillaud
trout|سلمون مرقط|Trout|Truite
mackerel|ماكريل|Mackerel|Maquereau
herring|رنجة|Herring|Hareng
anchovy|أنشوفة|Anchovy|Anchois
seabass|قاروص|Sea bass|Bar
`), topics: [
topic('اذكر نوع فاكهة','Name a fruit','Citez un fruit','apple banana orange grape mango pear peach plum kiwi'),
topic('اذكر نوعًا من الحمضيات','Name a citrus fruit','Citez un agrume','lemon lime orange grapefruit mandarin clementine pomelo kumquat citron'),
topic('اذكر فاكهة حمراء أو بنفسجية عند نضجها','Name a fruit that can be red or purple when ripe','Citez un fruit pouvant être rouge ou violet à maturité','strawberry raspberry blackberry cherry pomegranate grape plum apple watermelon'),
topic('اذكر فاكهة تنمو في المناطق الاستوائية','Name a fruit grown in tropical regions','Citez un fruit cultivé sous les tropiques','banana mango pineapple papaya coconut guava passion lychee dragon'),
topic('اذكر فاكهة تؤكل مجففة','Name a fruit eaten dried','Citez un fruit consommé séché','date fig apricot raisin prune mango banana apple coconut'),
topic('اذكر خضارًا يستخدم في الطبخ','Name a vegetable used in cooking','Citez un légume utilisé en cuisine','tomato potato carrot onion pepper zucchini eggplant broccoli cabbage'),
topic('اذكر ورقة أو عشبة تؤكل','Name an edible leaf or herb','Citez une feuille ou herbe comestible','lettuce spinach cabbage kale arugula chard parsley mint basil'),
topic('اذكر جذرًا أو بصلة أو درنة تؤكل','Name an edible root, bulb or tuber','Citez une racine, un bulbe ou un tubercule comestible','carrot turnip beet radish sweetpotato potato onion garlic celeriac'),
topic('اذكر بقولًا','Name a legume','Citez une légumineuse','lentil chickpea bean pea fava soy peanut lupin mung'),
topic('اذكر حبوبًا أو شبه حبوب تؤكل','Name an edible grain or pseudocereal','Citez une céréale ou pseudo-céréale','rice wheat barley oats corn rye millet sorghum quinoa'),
topic('اذكر نوعًا من المكسرات في المطبخ','Name a culinary nut','Citez un fruit à coque en cuisine','almond walnut hazelnut pistachio cashew pecan macadamia brazilnut pine'),
topic('اذكر بهارًا أو توابل','Name a spice or seasoning','Citez une épice ou un assaisonnement','salt blackpepper cumin cinnamon turmeric paprika clove cardamom nutmeg'),
topic('اذكر عشبة عطرية تستعمل في الطبخ','Name a culinary herb','Citez une herbe aromatique','parsley mint basil thyme rosemary oregano dill coriander sage'),
topic('اذكر منتجًا من الحليب','Name a dairy product','Citez un produit laitier','milk yogurt cheese butter cream labneh kefir ghee icecream'),
topic('اذكر شيئًا يقدم في الفطور','Name something served at breakfast','Citez un aliment de petit-déjeuner','bread egg cheese milk honey jam olive yogurt oats'),
topic('اذكر مشروبًا غير كحولي','Name a non-alcoholic drink','Citez une boisson sans alcool','water tea coffee juice lemonade cocoa smoothie soda herbal'),
topic('اذكر حلوى أو طبق تحلية','Name a dessert','Citez un dessert','cake cookie brownie pudding tart baklava kunafa halva icecream'),
topic('اذكر طعامًا من المطبخ الإيطالي','Name an Italian food','Citez une spécialité italienne','pizza pasta risotto lasagna gnocchi ravioli focaccia bruschetta tiramisu'),
topic('اذكر طبقًا معروفًا في بلاد الشام','Name a Levantine dish','Citez un plat du Levant','hummus falafel tabbouleh fattoush shawarma kibbeh mansaf maqluba musakhan'),
topic('اذكر طبقًا معروفًا في المغرب العربي','Name a North African dish','Citez un plat maghrébin','couscous tagine harira brik chorba shakshuka pastilla baghrir msemen'),
topic('اذكر صلصة أو إضافة تقدم مع الطعام','Name a sauce or condiment','Citez une sauce ou un condiment','ketchup mayo mustard soySauce pesto tahini salsa hotSauce bbq'),
topic('اذكر سمكًا يؤكل','Name an edible fish','Citez un poisson comestible','salmon tuna sardine cod trout mackerel herring anchovy seabass'),
topic('اذكر مكونًا يستخدم في الخَبز أو الحلويات','Name a baking or dessert ingredient','Citez un ingrédient de pâtisserie','wheat egg butter milk honey chocolate cinnamon cream almond'),
topic('اذكر غذاء غنيًا بالبروتين','Name a protein-rich food','Citez un aliment riche en protéines','egg cheese lentil chickpea bean soy tuna salmon yogurt'),
topic('اذكر مكونًا يصلح لسلطة','Name a salad ingredient','Citez un ingrédient de salade','lettuce tomato cucumber carrot onion olive corn pepper arugula'),
topic('اذكر طعامًا يمكن تقديمه مشويًا','Name a food that can be grilled','Citez un aliment pouvant être grillé','salmon tuna eggplant zucchini pepper corn potato onion cheese'),
topic('اذكر طعامًا يحفظ عادة في الثلاجة','Name a food commonly stored in the fridge','Citez un aliment conservé au réfrigérateur','milk yogurt butter cream cheese salmon tuna lettuce egg'),
topic('اذكر طعامًا جافًا يحفظ في خزانة','Name a dry pantry food','Citez un aliment sec du placard','rice pasta oats lentil chickpea almond walnut cookie raisin'),
topic('اذكر فاكهة تصلح للعصير','Name a fruit used for juice','Citez un fruit pour faire du jus','orange apple grape mango pineapple pomegranate lemon guava watermelon'),
topic('اذكر مكونًا يصلح لشطيرة','Name a sandwich ingredient','Citez un ingrédient de sandwich','bread cheese egg tuna tomato lettuce cucumber mayo mustard'),
] };
