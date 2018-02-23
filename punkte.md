---
layout: page
---
# Gesamtbewertung

40% Standardisierter Datensatz Rang
20 % Standardisierter Kategorie Rang
15 % Standardisierter Kategorie Varianz Rang
10% Standardisierter Datenanzahl Rang
5 % Standardisierter Formate Rang
5% Standardisierter Letztes Update Rang
5 % Standardisierter Kategorie Rang

__Beispiel:__

||Stadt 1|Stadt 2|
|----|:---:|:---:|
|Standardisierter Datensatz Rank|1|2|
|Standardisierter Kategorie Rank|1|2|
|Standardisierter Kategorie Varianz Rank|1|2|
|Standardisierter Datenanzahl Rank|1|2|
|Standardisierter Formate Rank|1|2|
|Standardisierter Letztes Update Rank|1|2|
|Standardisierter Kategorie Rank|1|2|
|Gewichtete Punktzahl|0.4\*1 + 0.2\*1 +0.15\*1 +0.1\*1 +0.05\*1 +0.05\*1 +0.05\*1 = **1**|0.4\*2 + 0.2\*2 +0.15\*2 +0.1\*2 +0.05\*2 +0.05\*2 +0.05\*2 = **2**|
|Resultierender Rank|1|2|

## Datensatz

Jeder Datensatz wird eigenständig bewerted. Die Bewertung setzt sich folgendermaßen zusammen:
Maximal zu erreichende Punkzahl für einen Datensatz: 3.
Am Ende wird das arithmetische Mittel der Datensätze genommen für die Punktzahl.


### Detailierte Datensatz Punktzahl
Jeder Datensatz wird nach drei Kriterien bewertet:

- Lizenz
- Format
- Letztes Update

#### Lizenz
Hat der Datensatz eine Offene Lizenz so erhält dieser 1 Punkt. Andernfalls 0 Punkte.

#### Format
Wenn der Datensatz Resourcen hat, die maschinenlesbar und offen sind, erhählt der Datensatz 1 Punkt.
Wenn er entweder maschinenlesbar oder offene Formate hat nur einen halben Punkt.
Sonst 0 Punkte.

#### Letztes Update
Wurde der Datensatz in den letzten 7 Tagen verändert erhält dieser 1 Punkt.
In den letzten 30 Tagen resultiert in 0,5 Punkten.
Ansonsten 0 Punkte.

**Beispiel**

|Punktzahl|Lizenz|Format|Update|Resultat|
|----|:---:|:---:|----|----|
|Dataset 1|Offen = **1** |maschinenlesbar = 0.5|vor 3 Tagen = 1|1+0.5+1 = **2.5**|
|Dataset 2|Nicht-offene Lizenz = **0**|maschinenlesbar und offens Format = **1** | vor 32 Tagen = **0.5**|0+1+0.5 = **1.5**|


## Kategorie

Die maximal erreichbare Punktzahl bei der Bewertung der Kategorie ist 1.
1 Punkt kann erreicht werden, wenn die Stadt in jeder Kategorie mind einen Datensatz hat. 0,5 Punkte, wenn die Stadt in mind der Hälfte der Kategorien mind. einen Datensatz hat. Sonst 0 Punkte.

## Varianz der Kategorien

Die Varianz misst die Streuung der Datensätze je Kategorien. Als Grundlage wird die Anzahl Datensätze je Kategorie genommen. Je höher die Varianz um so mehr Datesätze sind in nur wenigen Kategorien. Je gleichverteilter die Datensätze je Kategorie umso geringer ist die Varianz.
Eine niedrige Varianz wird hier hoch bewertet.

## Datenanzahl

Je mehr Datensätze eine Stadt hat, umso höher ist der Rang in dieser Bewertung.

## Anzahl Formate

Je mehr verschiedene Formate eine Stadt hat, umso höher ist der Rang in dieser Bewertung.

## Standardisierung

Jede resultierender Rang einer Bewertung wird standardisiert.
Der Rang wird durch den maximal erreichbanren Rang geteilt und mit 100 multipliziert.

_Beispiel_

Rang: 1
Max Rang: 100
Standardisierter Rang: 1

Rang: 10
Max Rang: 80
Standardisierter Rang: 12,5

# Lizenzen & Formate

Hier eine Liste von Lizenzen und Formaten und deren Bedeutung beim Scoring.
## Formate

{% include formats.html %}

## Offene Lizenzen

{% include lizenzen.html %}
