import {
  Rule,
  AnyExpression,
  AndExpression,
  OrExpression,
  NotExpression,
  DrugEntry,
  Drug,
  Frequency,
  Interval,
} from "./gheop3s";

export const rules = [
  /* List 1 */
  new Rule(
    "1.1",
    "Centraal werkende antihypertensiva (bv. clonidine, guanfacine, methyldopa, moxonidine)",
    "Hoog risico op ongewenste effecten op het centraal zenuwstelsel; Kan bradycardie en orthostatische hypotensie veroorzaken; Niet aanbevolen als routinebehandeling voor hypertensie",
    "Overweeg andere veiligere antihypertensiva, tenzij duidelijke intolerantie of gebrek aan werkzaamheid met andere klassen van antihypertensiva",
    new AnyExpression(
      new DrugEntry(
        new Drug(
          "Centraal werkende antihypertensiva (bv. clonidine, guanfacine, methyldopa,moxonidine)",
          ["C02A", "C02LB", "C02LA", "C02LC"],
        ),
        "",
        Frequency.ANY,
        1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.2",
    "digoxine > 0.125mg/dag",
    "Ongunstige risico/batenverhouding (veiligere alternatieven beschikbaar); Risico op overdosering bij nierinsufficiëntie: nausea, braken, slaperigheid, gezichtsstoornissen, hartritmestoornissen",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie \n 2. Indien therapie nodig is: verlaag de dosis van digoxine tot ≤ 0,125 mg/dag en adviseer om de digoxineserumspiegel te controleren",
    new AnyExpression(
      new DrugEntry(
        new Drug("Digoxine > 0,125 mg/dag", ["C01AA05"]),
        "",
        Frequency.ANY,
        0.125,
        Interval.DAILY,
      ),
    ),
  ),
  new Rule(
    "1.3",
    "Acetylsalicylzuur > 100 mg/dag",
    "Geen bewijs voor verhoogde werkzaamheid; Verhoogd risico op bloedingen en gastro-intestinale ongewenste effecten (bv. ulcus, bloeding, perforatie) bij hoogrisicogroepen (bv. > 75 jaar of bij gebruik van systemische corticosteroïden, anticoagulantia of antiaggregantia)",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Voor gebruik als antiaggregans: verlaag dosis tot 75-100 mg/dag Voor gebruik bij koorts of pijn: verkies paracetamol Voor gebruik bij ontsteking: verkies topisch NSAID of oraal NSAID in de laagst mogelijke dosis met/zonder een PPI en beperk de gebruiksduur (zie criterium 15 'Systemische NSAID's')",
    new AnyExpression(
      new DrugEntry(
        new Drug("Acetylsalicylzuur > 100 mg/dag", [
          "B01AC06",
          "B01AC56",
          "C07FX02",
          "C07FX03",
          "C07FX04",
          "C10BX01",
          "C10BX02",
          "C10BX04",
          "C10BX05",
          "C10BX06",
          "C10BX08",
          "C10BX12",
          "M01BA03",
          "N02AJ02",
          "N02AJ07",
          "N02AJ18",
          "N02BA01",
          "N02BA51",
          "N02BA71",
        ]),
        "",
        Frequency.ANY,
        0.1,
        Interval.DAILY,
      ),
    ),
  ),
  new Rule(
    "1.4",
    "Dipyridamol",
    "Veiligere alternatieven beschikbaar (meer bewijs voor acetylsalicylzuur); Risico op vasodilatatie met hoofdpijn, warmte-opwellingen en hypotensie",
    "Vervang dipyridamol door acetylsalicylzuur in een lage dosis (75-100 mg/dag) of een ander antitrombotisch geneesmiddel volgens de indicatie",
    new AnyExpression(
      new DrugEntry(
        new Drug("Dipyridamol", ["B01AC07"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.5",
    "PPI’s > 8 weken",
    "Potentieel verhoogd risico op ongewenste effecten: pneumonie, vitamine B12-tekort, hypomagnesiëmie, fracturen, gastro-intestinale infecties, nierlijden",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie geleidelijk 2. Als therapie nodig is: identificeer de mogelijke geneesmiddelgerelateerde oorzaak en overweeg om de oorzakelijke medicatie te stoppen of de dosis ervan te verlagen 3. Overweeg een niet-farmacologische aanpak met een afbouwplan om te stoppen of om de dosis te verlagen tot de laagst mogelijke dosis",
    new AnyExpression(
      new DrugEntry(
        new Drug("PPI > 8 weken", ["A02BC", "B01AC56"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.6",
    "Alizapride",
    "Kan slaperigheid en extrapiramidale effecten veroorzaken zoals Parkinsonisme en tardieve dyskinesie; Het risico kan hoger zijn bij kwetsbare oudere personen en bij langdurige blootstelling",
    "1. Evalueer opnieuw de indicatie. Indien niet gebruikt voor nausea/braken veroorzaakt door anesthesie/chirurgische ingreep of chemotherapie/radiotherapie: stop de therapie 2. Als therapie nodig is: identificeer mogelijke (geneesmiddelgerelateerde) oorzaak en overweeg om de oorzakelijke medicatie te stoppen of de dosis ervan te verlagen 3. Bespreek de niet-farmacologische aanpak en schakel over naar een veiliger alternatief (bv. domperidon in de laagst mogelijke dosis gedurende max. 7 dagen)",
    new AnyExpression(
      new DrugEntry(
        new Drug("Alizapride", ["A03FA05"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.7",
    "Metoclopramide",
    "Kan slaperigheid en extrapiramidale effecten veroorzaken zoals Parkinsonisme en tardieve dyskinesie; Het risico kan hoger zijn bij kwetsbare oudere personen en bij langdurige blootstelling",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Als therapie nodig is: identificeer mogelijke (geneesmiddelgerelateerde) oorzaak en overweeg om de oorzakelijke medicatie te stoppen of de dosis ervan te verlagen 3. Bespreek de niet-farmacologische aanpak en schakel over naar een veiliger alternatief (bv. domperidon in de laagst mogelijke dosis gedurende max. 7 dagen) of verlaag de dosis van metoclopramide tot 3 x 5 mg/dag en gebruik voor max. 5 dagen",
    new AnyExpression(
      new DrugEntry(
        new Drug("Metoclopramide", ["A03FA01"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.8",
    "Vloeibare paraffine",
    "Kan leiden tot hypocalciëmie en hypokaliëmie, kan bij aspiratie leiden tot lipoïdpneumonie",
    "1. Stop de therapie 2. 	In   geval   van   constipatie:   identificeer   mogelijke   geneesmiddelgerelateerde   oorzaak   van   constipatie   en overweeg om de oorzakelijke medicatie te stoppen of de dosis ervan te verlagen 3. Bespreek de niet-farmacologische aanpak (bv. levensstijlaanpassingen) en/of stel een osmotisch laxativum voor",
    new AnyExpression(
      new DrugEntry(
        new Drug("Vloeibare paraffine", ["A06AA01", "A06AA51"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.9",
    "Contactlaxativa (bv. bisacodyl, picosulfaat, senna) voor dagelijks gebruik > 2 weken",
    "Verhoogd risico op ongewenste effecten (nausea, buikkrampen, elektrolytstoornissen, achteruitgang nierfunctie, diarree met risico op uitdroging) bij chronisch gebruik bij oudere personen; De veiligheid op lange termijn bij oudere personen is niet gekend",
    "    1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapi 2. Als therapie nodig is: identificeer de mogelijke geneesmiddelgerelateerde oorzaak van constipatie  en  overweeg om de oorzakelijke medicatie te stoppen of de dosis ervan te verlagen 3. Bespreek de niet-farmacologische aanpak (bv. levensstijlaanpassingen) en/of  stel een osmotisch laxativum voor",
    new AnyExpression(
      new DrugEntry(
        new Drug(
          "Contactlaxativa (bv. bisacodyl, picosulfaat, senna) voor dagelijks gebruik > 2 weken",
          ["A06AB"],
        ),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.10",
    "Theofylline",
    "Veiliger alternatief beschikbaar; Risico op ongewenste effecten door smalle therapeutische index; Twijfelachtige evidentie",
    "Evalueer opnieuw en overweeg een veiliger alternatief volgens de Global Initiative for Asthma (GINA) of Global Initiative for Chronic Obstructive Lung Disease (GOLD) richtlijnen",
    new AnyExpression(
      new DrugEntry(
        new Drug("Theofylline", ["R03DA04", "R03DB04", "R03DA54", "R03DA74"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.11",
    "Narcotische antitussiva (bv. codeïne, ethylmorfine, dihydrocodeïne,dextromethorfan, noscapine,folcodine)",
    "Beperkte evidentie; Oudere personen zijn gevoeliger voor ongewenste effecten (bv. constipatie en sedatie)",
    "Overweeg een niet-farmacologische aanpak en/of een veiliger alternatief",
    new AnyExpression(
      new DrugEntry(
        new Drug(
          "Narcotische antitussiva (bv. codeïne, ethylmorfine,dihydrocodeïne,dextromethorfan, noscapine,folcodine)",
          ["R05DA", "R05FA"],
        ),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.12",
    "Langwerkende sulfonylureumderivaten (bv.glibenclamide, glimepiride)",
    "Hoger risico op ernstige langdurige hypoglykemie",
    "Stop of schakel over op een ander antidiabeticum (bv. metformine of een ander sulfonylureumderivaat (gliclazide, gliquidon))",
    new AnyExpression(
      new DrugEntry(
        new Drug(
          "Langwerkende sulfonylureumderivaten (bv. glibenclamide, glimepiride)",
          ["A10BB01", "A10BB12", "A10BB03"],
        ),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.13",
    "Desmopressine",
    "Vermijd desmopressine voor de behandeling van nycturie of nachtelijke polyurie: hoog risico op hyponatriëmie en duizeligheid",
    "1. Ga mogelijke geneesmiddelgerelateerde oorzaak na 2. Overweeg om therapie te stoppen en over te schakelen naar een niet-farmacologische aanpak",
    new AnyExpression(
      new DrugEntry(
        new Drug("Desmopressine", ["H01BA02"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.14",
    "Opioïden",
    "Verhoogd risico op ongewenste effecten bij oudere personen (bv. ongewenste effecten van het centraal zenuwstelsel zoals verwardheid, delirium, nausea, constipatie, vallen) en risico op afhankelijkheid/tolerantie; Metabolisatie van codeïne/tramadol hangt af van het CYP2D6-genotype, wat kan leiden tot verschillende klinische responsen; Beperkte effecten op lange termijn; Specifiek voor tramadol: Verhoogd risico op hypoglykemie, serotoninesyndroom als gevolg van geneesmiddelinteracties, kan hyponatriëmie verergeren of veroorzaken; Voor combinatie van paracetamol met codeïne of tramadol: dosisaanpassing van individuele geneesmiddelen is niet mogelijk, verschillende farmacokinetische eigenschappen van beide geneesmiddelen",
    '1. Ga na of veiligere opties gebruikt werden: niet-farmacologische aanpak, max. dosis paracetamol, kortdurend gebruik van een topisch of systemisch NSAID met/zonder een PPI 2. Als opioïd nodig is: vermijd vaste combinaties met codeïne of tramadol en begin met de laagst mogelijke dosis van het opioïd met onmiddellijke afgifte ("Start low - go slow”) 3. Overweeg om door te gaan met niet-opioïde analgetica (bv. max. dosis paracetamol) 4. Beperk de gebruiksduur en overweeg om osmotisch laxativum toe te voegen (zie criterium 35 ‘Opioïd zonder laxativum’) 5. Ga na of er andere valrisicoverhogende geneesmiddelen (zie tabel B) zijn en evalueer regelmatig',
    new AnyExpression(
      new DrugEntry(
        new Drug("Opioïden", ["N02A"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.15",
    "Systemische* NSAID’s",
    "Verhoogd risico op gastro-intestinale ongewenste effecten (bv.ulcus, bloeding, perforatie) bij hoogrisicogroepen (bv. > 75 jaar of bij gebruik van systemische corticosteroïden, anticoagulantia of antiaggregantia); Verhoogd cardiovasculair risico (bv. verhoogde bloeddruk, hartfalen, myocardinfarct en cerebrovasculaire accidenten); Verhoogd risico op nierschade",
    "    1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Overweeg om over te schakelen op paracetamol en/of topisch NSAID 3. Als systemisch NSAID (keuze afhankelijk van de patiëntkarakteristieken, bv. cardiovasculaire en gastro-intestinale risico's) nodig is, verkies de laagst mogelijke dosis en beperk de gebruiksduur 4. Voeg een PPI toe in standaarddosis bij patiënten met verhoogd gastro-intestinaal risico 5. Adviseer om de nierfunctie en/of bloeddruk op te volgen, afhankelijk van de diagnose",
    new AnyExpression(
      new DrugEntry(
        new Drug(
          "Systemische* NSAID’s *Systemisch bv. oraal, parenteraal (bv. intraveneus, intramusculair, subcutaan), rectaal, bepaalde transdermale pleisters",
          [
            "M01AA",
            "M01AB",
            "M01AC",
            "M01AE",
            "M01AG",
            "M01AH",
            "M01AX01",
            "M01AX02",
            "M01B",
            "M02AA",
            "N02AJ02",
            "N02AJ07",
            "N02AJ08",
            "N02AJ14",
            "N02AJ18",
            "N02AJ19",
            "N02BA01",
            "N02BA15",
            "N02BA51",
            "N02BA65",
            "N02BA71",
            "N02BE51",
            "N02BB02",
            "N02BB52",
            "N02BB72",
          ],
        ),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.16",
    "Bisfosfonaten > 5 jaar",
    "Fractuurpreventie bij langdurig gebruik van bisfosfonaten is niet bewezen, met toenemende risico's op zeldzame ongewenste effecten (osteonecrose van de kaak en atypische femurfracturen)",
    "1. Overweeg om de therapie te stoppen 2. Bespreek de niet-farmacologische aanpak om het risico op vallen en fracturen te verminderen",
    new AnyExpression(
      new DrugEntry(
        new Drug("Bisfosfonaten > 5 jaar", ["M05BA", "M05BB"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.17",
    "Benzodiazepines of Z- geneesmiddelen (zolpidem, zopiclon)",
    "Bij oudere personen verhogen benzodiazepines/Z-geneesmiddelen het risico op overdreven sedatie, verwardheid, verminderde cognitie, delirium, vallen, fracturen en ongevallen",
    "    1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie geleidelijk 2. In geval van slapeloosheid: ga na of er mogelijke slaapverstorende medicatie gebruikt wordt 3. Als therapie nodig is: overweeg een niet-farmacologische aanpak met een afbouwplan om te stoppen of om de dosis te reduceren tot de laagst mogelijke dosis en/of schakel over naar een veiliger alternatief",
    new AnyExpression(
      new DrugEntry(
        new Drug("Benzodiazepines of Z- geneesmiddelen (zolpidem, zopiclon)", [
          "N05BA",
          "N05CD",
          "N05CF",
          "N03AE",
        ]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.18",
    "Antipsychotica > 1 maand",
    "Verhoogd risico op ongewenste effecten (bv. anticholinerge en metabole effecten, Parkinsonisme); Verhoogd risico op cerebrovasculair accident, cognitieve achteruitgang en mortaliteit bij patiënten met dementie",
    "1. Vermijd antipsychotica voor gedrags- en psychologische symptomen bij dementie (BPSD), tenzij niet- farmacologische opties gefaald hebben of niet mogelijk zijn en wanneer de  patiënt  zichzelf  of  anderen  schade dreigt te berokkenen, zo niet: stop de therapie geleidelijk 2. Als therapie nodig is: ga mogelijke oorzaken van BPSD na (bv. pijn, urineweginfectie, constipatie) en overweeg een niet- farmacologische aanpak 3. Overweeg de laagst mogelijke dosis van het antipsychoticum en beperk de gebruiksduur",
    new AnyExpression(
      new DrugEntry(
        new Drug("Antipsychotica > 1 maand", ["N05A", "N06CA", "N06CB"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.19",
    "Antidepressiva > 1 jaar",
    "Mogelijke anticholinerge en sedatieve effecten (vooral bij tricyclische antidepressiva); Kunnen orthostatische hypotensie veroorzaken",
    "    1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie geleidelijk 2. Indien therapie nodig is: overweeg een niet-farmacologische aanpak en/of een minder anticholinerg/sederend alternatief",
    new AnyExpression(
      new DrugEntry(
        new Drug("Antidepressiva > 1 jaar", ["N06A", "N06CA"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.20",
    "Barbituraten (bv. fenobarbital, primidon)",
    "Hoge mate van fysieke afhankelijkheid, tolerantie voor slaapvoordelen, Vele interacties mogelijk",
    "Overweeg een veiliger alternatief (tenzij gebruikt voor epilepsie in gespecialiseerde zorg), afhankelijk van de indicatie. Bij stoppen: therapie gradueel en langzaam afbouwen.",
    new AnyExpression(
      new DrugEntry(
        new Drug("Barbituraten (bv. fenobarbital, primidon)", [
          "N01AF",
          "N01AG",
          "N03AA",
          "N05CA",
          "N05CB",
        ]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.21",
    "Nitrofurantoïne > 6 maanden",
    "Mogelijke pulmonale toxiciteit, hepatotoxiciteit en perifere neuropathie, vooral bij langdurig gebruik; Veiligere alternatieven beschikbaar;    Profylactische    (dagelijkse)    antibioticatherapie voor terugkerende lage urineweginfecties wordt niet aanbevolen, vooral niet",
    "1. Stop de therapie: profylactische (dagelijkse) antibioticatherapie bij terugkerende lage urineweginfecties wordt niet aanbevolen, vooral niet met nitrofurantoïne bij oudere personen met nierinsufficiëntie 2. Als therapie nodig is: overweeg een niet-farmacologische aanpak",
    new AnyExpression(
      new DrugEntry(
        new Drug("Nitrofurantoïne > 6 maanden", ["J01XE01", "J01XE51"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.22",
    "Sederende antihistaminica (bv. chloorfenamine = chloorfeniramine, cinnarizine, difenhydramine, dimenhydrinaat, dimetindeen, doxylamine, feniramine, hydroxyzine, ketotifen, meclozine)",
    "Sterk anticholinerge effecten met o.a. risico op sedatie.; Klaring is gereduceerd bij oudere leeftijd; Tolerantie ontwikkelt zich bij gebruik als hypnoticum",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Verkies overschakelen naar lokale therapie of naar een minder sederend antihistaminicum (bv. bilastine, (levo)cetirizine, (des)loratadine, ebastine, fexofenadine, mizolastine, rupatadine)",
    new AnyExpression(
      new DrugEntry(
        new Drug(
          "Sederende antihistaminica (bv. chloorfenamine = chloorfeniramine, cinnarizine, difenhydramine, dimenhydrinaat, dimetindeen, doxylamine, feniramine, hydroxyzine, ketotifen,meclozine)",
          [
            "R06AB04",
            "R06AB54",
            "N07CA02",
            "N07CA52",
            "R06AA02",
            "R06AA52",
            "R06AA11",
            "R06AA61",
            "R06AB03",
            "R06AA09",
            "R06AA59",
            "R06AB05",
            "N05BB01",
            "N05BB51",
            "R06AX17",
            "R06AE05",
            "R06AE55",
          ],
        ),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.23",
    "Oraal elementair ijzer > 200 mg/dag",
    "Geen bewijs van verhoogde ijzerabsorptie boven deze doses; Verhoogd risico op gastro-intestinale ongewenste effecten",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Als therapie nodig is: verkies elementair ijzer < 200 mg/dag (of volgens nationale richtlijnen) in een vorm met onmiddellijke afgifte. Om gastro-intestinale problemen te vermijden: start met de laagst mogelijke dosis en verhoog de dosis indien nodig op basis van gastro-intestinale tolerantie. Overweeg een dosering om de andere dag in geval van gastro-intestinale problemen",
    new AnyExpression(
      new DrugEntry(
        new Drug("Oraal elementair ijzer > 200 mg/dag", [
          "B03AA",
          "B03AB",
          "B03AD",
          "B03AE",
        ]),
        "",
        Frequency.ANY,
        200,
        Interval.DAILY,
      ),
    ),
  ),
  new Rule(
    "1.24",
    "Orale decongestive (bv.fenylefrine, pseudo-efedrine)",
    "Hoger risico op ongewenste effecten bv. hypertensie, aritmieën,convulsies, psychosen, hallucinaties, slapeloosheid, urineretentie",
    "Stop de therapie en verkies intranasale therapie (hypertone zoutoplossing, vasoconstrictor < 10 dagen of corticosteroïd)",
    new AnyExpression(
      new DrugEntry(
        new Drug("Orale decongestive (bv.fenylefrine, pseudo-efedrine)", [
          "R01BA",
        ]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),
  new Rule(
    "1.25",
    "Intranasale decongestiva > 10 dagen",
    "isico op rebound neuscongestie (rhinitis medicamentosa), verhoogde bloeddruk",
    "Stop de therapie en verkies een hypertone zoutoplossing en/of intranasale corticosteroïden",
    new AnyExpression(
      new DrugEntry(
        new Drug("Intranasale decongestiva > 10 dagen", ["R01AA", "R01AB"]),
        "",
        Frequency.ANY,
        0.1,
        Interval.ANY,
      ),
    ),
  ),

  /* List 2 */
  new Rule(
    "2.26",
    "Thiaziden en lisdiuretica bij: Regelmatige jichtaanvallen",
    "Kunnen jicht verergeren of sneller doen ontstaan",
    "    1. Als diureticum nodig is: overweeg een dosisverlaging van het thiazide/lisdiureticum en (alleen indien nodig) overweeg om een kaliumsparend diureticum of een RAAS-inhibitor toe te voegen 2. Indien niet mogelijk: start met urinezuurverlagende medicatie, met voortzetten van het oorspronkelijke diureticum. Zorg voor voldoende hydratatie en volg de urinezuurspiegels op 3. Enkel in geval van aanhoudende jichtaanvallen: verkies een andere geschikte geneesmiddelklasse (bv. dihydropyridine calciumantagonist of RAAS-inhibitor)",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug("Thiaziden en lisdiuretica", [
            "C03C",
            "C03EB",
            "C07B",
            "C02L",
            "C03A",
            "C03BA04",
            "C03BA11",
            "C03BB04",
            "C03EA01",
            "C03EA06",
            "C07C",
            "C07D",
            "C08G",
            "C09BA",
            "C09BX01",
            "C09BX03",
            "C09DA",
            "C09DX01",
            "C09DX03",
            "C09DX06",
            "C09DX07",
            "C09DX08",
            "C09XA52",
            "C09XA54",
            "C10BX13",
          ]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
      new AnyExpression(
        new DrugEntry(
          new Drug("Regelmatige jichtaanvallen", ["M04"]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
    ]),
  ),
  new Rule(
    "2.27",
    "Niet-cardioselectieve β-blokkers (bv. carvedilol, labetalol, propranolol, timolol in oogdruppels) bij: Astma of COPD",
    "Kunnen	astma/COPD verergeren",
    "Overweeg een cardioselectieve β-blokker (bv. acebutolol, atenolol, betaxolol, bisoprolol, celiprolol, metoprolol,nebivolol) in de laagst mogelijke dosis of een ander geschikt geneesmiddel",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug(
            "Niet-cardioselectieve β-blokkers (bv. carvedilol, labetalol, propranolol, timolol in oogdruppels)",
            [
              "C07AA",
              "C07AG",
              "C07CG",
              "C07FX06",
              "C07BG",
              "C07BA",
              "C07FX01",
              "C07FX02",
              "S01ED01",
              "S01ED51",
              "C07CA",
              "C07DA",
              "C07EA",
            ],
          ),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
      new AnyExpression(
        new DrugEntry(
          new Drug("Astma of COPD", ["R03", "R03AA", "R03AB"]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
    ]),
  ),
  new Rule(
    "2.28",
    "Anti-emetica die de dopaminereceptor inhiberen (bv. alizapride, metoclopramide) bij: ziekte van Parkinson",
    "Dopaminereceptorantagonist en kunnen de symptomen van de ziekte van Parkinson verergeren",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Als therapie nodig is: bespreek de niet-farmacologische aanpak en overweeg domperidon in de laagst mogelijke dosis en beperk de gebruiksduur (max. 7 dagen)",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug(
            "Anti-emetica die de dopaminereceptor inhiberen (bv. alizapride, metoclopramide)",
            ["A03FA05", "A03FA01"],
          ),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
      new AnyExpression(
        new DrugEntry(
          new Drug("Ziekte van Parkinson", ["N04"]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
    ]),
  ),
  new Rule(
    /* TODO */ "2.29",
    "Geneesmiddelen die constipatie kunnen veroorzaken: opioïden, diltiazem, verapamil, geneesmiddelen met anticholinerge eigenschappen (bv. antihistaminica, antidepressiva, anti-epileptica, antiparkinsonmiddelen, antipsychotica, spasmolytica, zie Tabel A), calcium, aluminiumbevattende antacida bij: Constipatie",
    "Kunnen	constipatie verergeren",
    "    1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Als therapie nodig is: verkies overschakeling naar een veiliger alternatief met dezelfde indicatie (bv. met geen of minder anticholinerge werking, zie Tabel A) 3. Indien niet mogelijk: overweeg een dosisverlaging en beperk de gebruiksduur 4. Bespreek de niet-farmacologische aanpak van constipatie en voeg (indien nodig) een osmotisch laxativum toe",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
    ]),
  ),
  new Rule(
    "2.30",
    "Predniso(lo)nequivalent > 7,5 mg/dag bij: diabetes",
    "Kan diabetes mellitus verergeren",
    "1. Waarschuw de patiënt voor mogelijke ontregeling van de bloedglucosespiegel en adviseer om de bloedglucosespiegel en bloeddruk meer op te volgen 2. Indien mogelijk: overweeg een dosisverlaging van het corticosteroïd en beperk de gebruiksduur",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug("Predniso(lo)nequivalent", ["H02A", "H02B", "M01BA"]),
          "",
          Frequency.ANY,
          7.5,
          Interval.DAILY,
        ),
      ),
      new AnyExpression(
        new DrugEntry(
          new Drug("Diabetes", ["A10"]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
    ]),
  ),
  new Rule(
    "2.31",
    "Antipsychotica behalve clozapine of quetiapine bij: ziekte van Parkinson",
    "Dopaminereceptorantagonist en kunnen de symptomen van de ziekte van Parkinson verergeren",
    "1. Bespreek met de specialist: dosisaanpassing/vervanging van Parkinson medicatie die de psychotische symptomen mogelijk heeft veroorzaakt of een dosisverlaging en/of eventuele stop van het antipsychoticum 2. Als therapie nodig is: bespreek het overschakelen naar clozapine of quetiapine met de specialist, bij voorkeur in een lagere dosis voor patiënten met de ziekte van Parkinson",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug("Antipsychotica behalve clozapine of quetiapine", [
            "N05A",
            "N06CA",
            "N06CB",
            "N05AH02",
            "N05AH04",
          ]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
      new AnyExpression(
        new DrugEntry(
          new Drug("Ziekte van Parkinson", ["N04"]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
    ]),
  ),
  new Rule(
    "2.32" /*TODO*/,
    "Geneesmiddelen met anticholinerge eigenschappen (bv. antihistaminica, antidepressiva, antipsychotica, spasmolytica, zie Tabel A) bij: Benigne prostaathypertrofie",
    "Verhoogd	risico	op anticholinerge ongewenste effecten kan de urinestroom verminderen en urineretentie veroorzaken",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Als therapie nodig is: overweeg een niet-farmacologische aanpak en/of verkies een overschakeling naar een veiliger geneesmiddel met dezelfde indicatie met geen of minder anticholinerge werking (zie Tabel A) 3. Indien niet mogelijk: overweeg een dosisverlaging en beperk de gebruiksduur",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
    ]),
  ),
  new Rule(
    "2.33" /*TODO*/,
    "Geneesmiddelen met anticholinerge eigenschappen (bv. antihistaminica, antidepressiva, antipsychotica, spasmolytica, zie Tabel A) bij: Dementie/ verminderde cognitie",
    "Een verhoogde anticholinerge medicatielast kan de cognitieve en gedragsfunctie verslechteren; Verhoogd risico op ongewenste effecten t.h.v. het centraal zenuwstelsel",
    "1. Evalueer opnieuw of de indicatie nog steeds aanwezig is, zo niet: stop de therapie 2. Als therapie nodig is: bespreek de niet-farmacologische aanpak. Verkies overschakeling naar een veiliger alternatief met dezelfde indicatie met geen of minder anticholinerge werking (zie Tabel A) 3. Indien niet mogelijk: overweeg een dosisverlaging en beperk de gebruiksduur",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
    ]),
  ),

  /* List 3 */
  new Rule(
    "3.34" /*TODO*/,
    "Predniso(lo)nequivalent van ≥ 7,5 mg/dag voor ≥ 3 maanden zonder calcium/vitamine D suppletie en bisfosfonaat",
    "Langdurig gebruik van corticosteroïden is geassocieerd met een verhoogd risico op botverlies en fracturen",
    "1. Als langdurige corticosteroïdtherapie nodig is: bespreek de niet-farmacologische aanpak om het risico op vallen en fracturen te verminderen 2. Start met calcium/vitamine D en overweeg om een bisfosfonaat (bv. alendronaat) te starten volgens de nationale richtlijnen",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug("Corticosteroïden", ["H02A", "H02B", "M01BA"]),
          "",
          Frequency.ANY,
          7.5,
          Interval.DAILY,
        ),
      ),
      new NotExpression(
        new OrExpression([
          new AnyExpression(
            new DrugEntry(
              new Drug("Bisfosfonaten", [
                "M05BA",
                "M05BB",
                "M05BB01",
                "M05BB02",
                "M05BB04",
                "M05BB05",
                "M05BB08",
              ]),
              "",
              Frequency.ANY,
              0.1,
              Interval.ANY,
            ),
          ),
          new AnyExpression(
            new DrugEntry(
              new Drug("Calcium/vitamine D", [
                "A12A",
                "A11CC",
                "A11AA02",
                "A11GB01",
              ]),
              "",
              Frequency.ANY,
              0.1,
              Interval.ANY,
            ),
          ),
        ]),
      ),
    ]),
  ),
  new Rule(
    "3.35",
    "Opioïd zonder laxativum",
    "Opioïden hebben een nadelige invloed op de sensomotorische functie van het gastro-intestinale kanaal, wat kan leiden tot darmstoornissen die een spectrum van symptomen kunnen omvatten zoals nausea, braken, opgeblazen gevoel, gastro-oesofageale reflux-gerelateerde symptomen en constipatie",
    "1. Evalueer opnieuw  of  de  indicatie  voor  opioïden  nog  steeds  aanwezig  is,  zo niet: stop de therapie (zie criterium 14 ‘Opioïden’) 2. Als therapie nodig is: bespreek de niet-farmacologische aanpak van constipatie en overweeg om een osmotisch laxativum te starten (vooral bij chronisch gebruik)",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug("Opioïd", ["N02A", "N07BC"]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
      new NotExpression(
        new AnyExpression(
          new DrugEntry(
            new Drug("Laxativum", ["A06"]),
            "",
            Frequency.ANY,
            0.1,
            Interval.ANY,
          ),
        ),
      ),
    ]),
  ),
  new Rule(
    "3.36",
    "Methotrexaat zonder foliumzuursupplement",
    "Methotrexaat (een antimetaboliet) heeft een antagonistisch effect op het foliumzuurmetabolisme, wat kan leiden tot mucosale, gastro- intestinale, hepatische of hematologische ongewenste effecten; Suppletie met foliumzuur of folinezuur kan deze ongewenste effecten verminderen",
    "Voeg een foliumzuursupplement toe: eenmaal per week 5 tot 10 mg (één dag na de inname van methotrexaat), of dagelijks 1 mg",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(
          new Drug("Methotrexaat", ["L01BA01", "L04AX03"]),
          "",
          Frequency.ANY,
          0.1,
          Interval.ANY,
        ),
      ),
      new NotExpression(
        new AnyExpression(
          new DrugEntry(
            new Drug("Foliumzuursupplement", [
              "B03BB",
              "B03AD",
              "B03AE02",
              "B03AE01",
              "V03AF03",
              "V03AF04",
            ]),
            "",
            Frequency.ANY,
            0.1,
            Interval.ANY,
          ),
        ),
      ),
    ]),
  ),
  new Rule(
    "3.37",
    "Osteoporose therapie (bv. bisfosfonaten, denosumab, selectieve oestrogeenreceptor-modulatoren, teriparatide) zonder voldoende calcium/vitamine D",
    "Gecombineerde calcium- en vitamine D supplementen in een dagelijkse dosis van respectievelijk 0,5-1,2 g en 400-800 IE worden over het algemeen aanbevolen bij mensen die osteoporotische therapie krijgen, aangezien de evidentie voor de werkzaamheid van deze interventies voornamelijk gebaseerd is op gelijktijdige toediening van het geneesmiddel met calcium- en vitamine D supplementen",
    "1. Evalueer opnieuw of de osteoporotische therapie nog steeds nodig is (< 5 jaar of 5 tot 10 jaar voor hoogrisicopatiënten), zo niet (> 5 jaar en geen hoogrisicopatiënt): stop de therapie 2. Als therapie nog steeds nodig is: start calcium (dosis afhankelijk van de inname via voeding) en vitamine D",
    new AndExpression([
      new OrExpression([
        new AnyExpression(
          new DrugEntry(
            new Drug("Bisfosfonaten", [
              "M05BA",
              "M05BB",
              "M05BB01",
              "M05BB02",
              "M05BB04",
              "M05BB05",
              "M05BB08",
            ]),
            "",
            Frequency.ANY,
            0.1,
            Interval.ANY,
          ),
        ),
        new AnyExpression(
          new DrugEntry(
            new Drug("denosumab", ["M05BX04"]),
            "",
            Frequency.ANY,
            0.1,
            Interval.ANY,
          ),
        ),
        new AnyExpression(
          new DrugEntry(
            new Drug("Oestrogeenreceptor-modulatoren", ["G03XC"]),
            "",
            Frequency.ANY,
            0.1,
            Interval.ANY,
          ),
        ),
        new AnyExpression(
          new DrugEntry(
            new Drug("teriparatide", ["H05AA02"]),
            "",
            Frequency.ANY,
            0.1,
            Interval.ANY,
          ),
        ),
      ]),
      new NotExpression(
        new AnyExpression(
          new DrugEntry(
            new Drug("Calcium/vitamine D", [
              "A12A",
              "A11CC",
              "A11AA02",
              "A11GB01",
            ]),
            "",
            Frequency.ANY,
            0.1,
            Interval.ANY,
          ),
        ),
      ),
    ]),
  ),
  new Rule(
    "2.38" /* TODO */,
    "Oudere persoon zonder jaarlijkse griepvaccinatie",
    "Influenza    bij    oudere   personen   kan	respiratoire complicaties veroorzaken (bv. pneumonie, exacerbatie van chronische respiratoire aandoening, ziekenhuisopnames en overlijden)",
    "Bespreek de noodzaak van een griepvaccinatie met de arts en patiënt",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
    ]),
  ),
  new Rule(
    "2.39" /* TODO */,
    "Oudere persoon met een hoog risico op pneumokokkeninfectie zonder pneumokokkenvaccinatie",
    "Streptococcus pneumoniae is verantwoordelijk voor een aanzienlijke ziektelast en sterfte bij volwassenen wereldwijd, meestal door een pneumonie en minder vaak door invasieve pneumokokkeninfectie; Vaccinatie zou deze ziekte en sterfte kunnen verminderen",
    "Bespreek de noodzaak van een pneumokokkenvaccinatie met de arts en patiënt.",
    new AndExpression([
      new AnyExpression(
        new DrugEntry(new Drug("", []), "", Frequency.ANY, 0.1, Interval.ANY),
      ),
    ]),
  ),
];
