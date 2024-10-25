import { useQuery } from "@apollo/client";
import { View, Text, Image, } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { GET_ALL_BADGES_INFO_BY_USER } from "../../../utils/query/badgesScreenQueries";

const userId = "670db268582e7e887e447288";

interface Badge {
  __typename: string;
  achieved: boolean;
  badgeId: {
    __typename: string;
    badge_desc: string;
    badge_image_address: string;
    badge_name: string;
    criteria: object[];
    id: string;
    last_updated: string | null;
  };
  progress: string | null;
}

interface BadgeImages {
  [key: string]: any; 
}

const BadgesScreen: React.FC = () => {
  const [badgeData, setBadgeData] = useState<Badge[]>([]);

  const { loading, error, data } = useQuery(GET_ALL_BADGES_INFO_BY_USER, {
    variables: { getUserBadgeId: userId },
  });

  // This will go away once we put the data online
  const badgeImages: BadgeImages = {
    "670b2125cb185c3905515da2": require('../../../../assets/badgesWithIds/670b2125cb185c3905515da2.png'),
    "670b2149cb185c3905515da4": require('../../../../assets/badgesWithIds/670b2149cb185c3905515da4.png'),
    "670b215bcb185c3905515da6": require('../../../../assets/badgesWithIds/670b215bcb185c3905515da6.png'),
    "670b216fcb185c3905515da8": require('../../../../assets/badgesWithIds/670b216fcb185c3905515da8.png'),
    "670b2188cb185c3905515daa": require('../../../../assets/badgesWithIds/670b2188cb185c3905515daa.png'),
    "670b2192cb185c3905515dac": require('../../../../assets/badgesWithIds/670b2192cb185c3905515dac.png'),
    "670b2199cb185c3905515dae": require('../../../../assets/badgesWithIds/670b2199cb185c3905515dae.png'),
    "670b21a8cb185c3905515db0": require('../../../../assets/badgesWithIds/670b21a8cb185c3905515db0.png'),
    "670b21b1cb185c3905515db2": require('../../../../assets/badgesWithIds/670b21b1cb185c3905515db2.png'),
  };
  

  useEffect(() => {
    if (data?.getUserBadge?.badges) {
      console.log(data.getUserBadge.badges);
      setBadgeData(data.getUserBadge.badges);
    }
  }, [data])

  return (
    <View>
      <Text fontSize={22} color="black" fontWeight={"$bold"}>Collected Badges</Text>
      {/* I have to make this part scrollable horizontally */}
      {
        badgeData.map( b => {
          if (b.achieved === true) {
            return (
              <View paddingVertical={10} paddingHorizontal={20} backgroundColor="$violet100" width={140}>
                <Image w={100} h={100} source={badgeImages[b.badgeId.id]} alt={b.badgeId.badge_name} marginBottom={14}/>
                <Text color="black">{b.badgeId.badge_name}</Text>
              </View>
            )
          }
        })
      }
      <Text fontSize={22} color="black" fontWeight={"$bold"}>All Badges</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {
          badgeData.map( b => {
            return (
              <View style={{ width: '28%', marginBottom: 10 }}>
                {/* Change Image to dynamic rendering from remote path later */}
                <Image w={80} h={80} source={badgeImages[b.badgeId.id]} opacity={b.achieved ? 1 : 0.5} alt={b.badgeId.badge_name} marginBottom={8} />
                <Text color={ b.achieved ? "black" : "$trueGray400"} fontSize={12} textAlign="center" >{b.badgeId.badge_name}</Text>            
              </View>            
            )
          })
        }        
      </View>

    </View>
  );
};

export default BadgesScreen;
