// ** I18N

// Calendar EN language
// Author: Mihai Bazon, <mishoo@infoiasi.ro>
// Encoding: any
// Distributed under the same terms as the calendar itself.

// For translators: please use UTF-8 if possible.  We strongly believe that
// Unicode is the answer to a real internationalized world.  Also please
// include your contact information in the header, as can be seen above.

// full day names
Calendar._DN = new Array
("Dimanche",
 "Lundi",
 "Mardi",
 "Mercredi",
 "Jeudi",
 "Vendredi",
 "Samedi",
 "Dimanche");

// Please note that the following array of short day names (and the same goes
// for short month names, _SMN) isn't absolutely necessary.  We give it here
// for exemplification on how one can customize the short day names, but if
// they are simply the first N letters of the full name you can simply say:
//
//   Calendar._SDN_len = N; // short day name length
//   Calendar._SMN_len = N; // short month name length
//
// If N = 3 then this is not needed either since we assume a value of 3 if not
// present, to be compatible with translation files that were written before
// this feature.

// short day names
Calendar._SDN = new Array
("Dim",
 "Lun",
 "Mar",
 "Mer",
 "Jeu",
 "Ven",
 "Sam",
 "Dim");

// full month names
Calendar._MN = new Array
("Janvier",
 "F\u00E9vrier",
 "Mars",
 "Avril",
 "Mai",
 "Juin",
 "Juillet",
 "Aout",
 "Septembre",
 "Octobre",
 "Novembre",
 "D\u00E9cembre");

// short month names
Calendar._SMN = new Array
("Jan",
 "Fev",
 "Mar",
 "Avr",
 "Mai",
 "Juin",
 "Juil",
 "Aout",
 "Sep",
 "Oct",
 "Nov",
 "Dec");

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "A propos du calendrier";

Calendar._TT["ABOUT"] =
"DHTML Date/Heure Selecteur\n" +
"(c) dynarch.com 2002-2003\n" + // don't translate this this ;-)
"Pour la derni\u00E8re version visitez: http://dynarch.com/mishoo/calendar.epl\n" +
"Distribu\u00E9 par GNU LGPL.  Voir http://gnu.org/licenses/lgpl.html pour les d\u00E9tails." +
"\n\n" +
"S\u00E9lection de la date :\n" +
"- Utiliser les boutons \xab, \xbb  pour s\u00E9lectionner l\'ann\u00E9e\n" +
"- Utiliser les boutons " + String.fromCharCode(0x2039) + ", " + String.fromCharCode(0x203a) + " pour selectionner les mois\n" +
"- Garder la souris sur n'importe quels boutons pour une s\u00E9lection plus rapide";
Calendar._TT["ABOUT_TIME"] = "\n\n" +
"S\u00E9lection de l\'heure:\n" +
"- Cliquer sur heures ou minutes pour incr\u00E9menter\n" +
"- ou Maj-clic pour d\u00E9cr\u00E9menter\n" +
"- ou clic et glisser d\u00E9placer pour une s\u00E9lection plus rapide";

Calendar._TT["PREV_YEAR"] = "Ann\u00E9e pr\u00E9c. (maintenir pour menu)";
Calendar._TT["PREV_MONTH"] = "Mois pr\u00E9c. (maintenir pour menu)";
Calendar._TT["GO_TODAY"] = "Atteindre date du jour";
Calendar._TT["NEXT_MONTH"] = "Mois suiv. (maintenir pour menu)";
Calendar._TT["NEXT_YEAR"] = "Ann\u00E9e suiv. (maintenir pour menu)";
Calendar._TT["SEL_DATE"] = "Choisir une date";
Calendar._TT["DRAG_TO_MOVE"] = "D\u00E9placer";
Calendar._TT["PART_TODAY"] = " (Aujourd'hui)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = "Afficher en premier %s";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = "0,6";

Calendar._TT["CLOSE"] = "Fermer";
Calendar._TT["TODAY"] = "Aujourd'hui";
Calendar._TT["TIME_PART"] = "(Shift-)clic et glisser d\u00E9placer pour changer la valeur";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "%Y-%m-%d";
Calendar._TT["TT_DATE_FORMAT"] = "%a, %b %e";

Calendar._TT["WK"] = "sem";
Calendar._TT["TIME"] = "Heure:";
